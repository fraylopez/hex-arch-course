
import chai, { expect } from "chai";
import { MemoryAccountRepository } from "../src/hexagon/adapters/driven/MemoryAccountRepository";
import { Bank } from "../src/hexagon/application/Bank";
import chaiAsPromised from "chai-as-promised";
import { ForManagingAccounts } from "../src/hexagon/ports/driver/ForManagingAccounts";
import { Money } from "../src/hexagon/application/Money";
import { TestUtils } from "../../utils/TestUtils";
import { EURRatioService } from "../src/hexagon/application/EURRatioService";

chai.use(chaiAsPromised);

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {

  describe('Bank TestAdapter', () => {
    let testAdapter: ForManagingAccounts;
    before(() => {
      testAdapter = new Bank(new MemoryAccountRepository(), new EURRatioService());
    });

    it('should create and retrieve an account', async () => {
      const accountId = await testAdapter.create('John', "EUR");
      const account = await testAdapter.find(accountId);
      expect(account).to.not.equal(undefined);
    });

    it('should deposit same currency amount', async () => {
      const accountId = await testAdapter.create('John', "EUR");
      await testAdapter.deposit(accountId, 100, "EUR");
      const account = await testAdapter.find(accountId);
      expect(account.getBalance()).to.deep.equal(new Money(100, "EUR"));
    });

    it('should reject deposit other currency amount', async () => {
      const accountId = await testAdapter.create('John', "EUR");
      await expect(testAdapter.deposit(accountId, 100, "USD"))
        .to.be.rejectedWith(Error, 'Incompatible currency');
    });

    it('should witdraw same currency amount', async () => {
      const accountId = await testAdapter.create('John', "EUR");
      await testAdapter.deposit(accountId, 100, "EUR");
      await testAdapter.withdraw(accountId, 99, "EUR");
      const account = await testAdapter.find(accountId);
      expect(account.getBalance()).to.deep.equal(new Money(1, "EUR"));
    });

    it('should reject withdraw other currency amount', async () => {
      const accountId = await testAdapter.create('John', "EUR");
      await expect(testAdapter.withdraw(accountId, 99, "USD"))
        .to.be.rejectedWith(Error, 'Incompatible currency');
    });
    it('should allow 10 EUR credit', async () => {
      const accountId = await testAdapter.create('John', "EUR");
      await testAdapter.withdraw(accountId, 10, "EUR");
      const account = await testAdapter.find(accountId);
      expect(account.getBalance()).to.deep.equal(new Money(-10, "EUR"));
    });

    it('should allow 10 USD debit', async () => {
      const accountId = await testAdapter.create('John', "USD");
      await testAdapter.withdraw(accountId, 10, "USD");
      const account = await testAdapter.find(accountId);
      expect(account.getBalance()).to.deep.equal(new Money(-10, "USD"));
    });
    // 1 EUR = 1.1 USD
    it('should allow 11 USD debit', async () => {
      const accountId = await testAdapter.create('John', "USD");
      await testAdapter.withdraw(accountId, 11, "USD");
      const account = await testAdapter.find(accountId);
      expect(account.getBalance()).to.deep.equal(new Money(-11, "USD"));
    });
  });
});