
import chai, { expect } from "chai";
import { Bank } from "../src/contexts/accounting/application/Bank";
import { IncompatibleCurrencyError } from "../src/contexts/accounting/domain/IncompatibleCurrencyError";
import { Money } from "../src/contexts/_shared/domain/Money";
import chaiAsPromised from "chai-as-promised";
import { ForAccountAdministration } from "../src/contexts/admin/domain/ForAccountAdministration";
import { BankAdmin } from "../src/contexts/admin/application/BankAdmin";
import { MemoryAdminAccountRepository } from "../src/contexts/admin/adapters/persistence/memory/MemoryAdminAccountRepository";
import { MemoryAccountRepository } from "../src/contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { ForManagingAccounts } from "../src/contexts/accounting/domain/ForUsingAccounts";
import { Account } from "../src/contexts/accounting/domain/Account";
import { MemoryRepository } from "../src/contexts/_core/adapters/persistance/memory/MemoryRepository";

chai.use(chaiAsPromised);

describe('DDDBank TestAdapter', () => {

  describe('Accounting', () => {
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
  describe('Admin', () => {
    let bankAdapter: ForManagingAccounts;
    let adminAdapter: ForAccountAdministration;
    before(() => {
      const memoryRepository = new MemoryRepository<Account>();
      const memoryAccountRepository = new MemoryAccountRepository();
      const memoryAdminAccountRepository = new MemoryAdminAccountRepository();

      memoryAccountRepository.setMemoryRepository(memoryRepository);
      memoryAdminAccountRepository.setMemoryRepository(memoryRepository);

      bankAdapter = new Bank(memoryAccountRepository);
      adminAdapter = new BankAdmin(memoryAdminAccountRepository);
    });

    it('should close an  account', async () => {
      const accountId = await bankAdapter.create('John', "EUR");
      await adminAdapter.close(accountId);
      const account = await adminAdapter.find(accountId);
      expect(account.isOpen()).to.equal(false);
    });

    it('should reopen an  account', async () => {
      const accountId = await bankAdapter.create('John', "EUR");
      await adminAdapter.close(accountId);
      await adminAdapter.reopen(accountId);
      const account = await adminAdapter.find(accountId);
      expect(account.isOpen()).to.equal(true);
    });
  });
});