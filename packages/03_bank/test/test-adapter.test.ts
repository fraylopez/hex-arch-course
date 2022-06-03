
import chai, { expect } from "chai";
import { MemoryAccountRepository } from "../src/hexagon/adapters/secondary/MemoryAccountRepository";
import { Bank } from "../src/hexagon/application/Bank";
import chaiAsPromised from "chai-as-promised";
import { ForManagingAccounts } from "../src/hexagon/application/ForManagingAccounts";
import { Money } from "../src/hexagon/application/Money";

chai.use(chaiAsPromised);

describe('Bank TestAdapter', () => {
  let testAdapter: ForManagingAccounts;
  before(() => {
    testAdapter = new Bank(new MemoryAccountRepository());
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

  it.skip('should reject withdraw more than balance', async () => {
    // TODO
  });
});