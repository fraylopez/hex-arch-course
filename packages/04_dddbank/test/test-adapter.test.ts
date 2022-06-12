
import chai, { expect } from "chai";
import { BankWindow } from "../src/contexts/accounting/application/BankWindow";
import { IncompatibleCurrencyError } from "../src/contexts/accounting/domain/IncompatibleCurrencyError";
import { Money } from "../src/contexts/_shared/domain/Money";
import chaiAsPromised from "chai-as-promised";
import { MemoryAccountRepository } from "../src/contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { ForCreatingAccounts } from "../src/contexts/accounting/domain/ForCreatingAccounts";
import { ForExistingAccountsOperation } from "../src/contexts/accounting/domain/ForAccountsInteraction";
import { ATM } from "../src/contexts/accounting/application/ATM";
import { TestUtils } from "../../utils/TestUtils";
import { AccountRepository } from "../src/contexts/accounting/domain/AccountRepository";

chai.use(chaiAsPromised);

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe('DDDBank TestAdapter', () => {
    describe('Window', () => {
      let testAdapter: ForCreatingAccounts & ForExistingAccountsOperation;
      before(() => {
        testAdapter = new BankWindow(new MemoryAccountRepository());
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
          .to.be.rejectedWith(IncompatibleCurrencyError);
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
          .to.be.rejectedWith(IncompatibleCurrencyError);
      });

      it.skip('should reject withdraw more than balance', async () => {
        // TODO
      });
    });

    describe('ATM', () => {
      let creationTestAdapter: ForCreatingAccounts;
      let testAdapter: ForExistingAccountsOperation;
      let repository: AccountRepository;
      before(() => {
        repository = new MemoryAccountRepository();
        creationTestAdapter = new BankWindow(repository);
        testAdapter = new ATM(repository);
      });

      it('should reject deposit other currency amount', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await expect(testAdapter.deposit(accountId, 100, "USD"))
          .to.be.rejectedWith(IncompatibleCurrencyError);
      });

      it('should witdraw same currency amount', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await testAdapter.deposit(accountId, 100, "EUR");
        await testAdapter.withdraw(accountId, 99, "EUR");
        const account = await testAdapter.find(accountId);
        expect(account.getBalance()).to.deep.equal(new Money(1, "EUR"));
      });

      it('should reject withdraw other currency amount', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await expect(testAdapter.withdraw(accountId, 99, "USD"))
          .to.be.rejectedWith(IncompatibleCurrencyError);
      });

    });
  });
});