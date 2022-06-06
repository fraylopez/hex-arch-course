
import chai, { expect } from "chai";
import { BankWindow } from "../src/contexts/accounting/application/BankWindow";
import { IncompatibleCurrencyError } from "../src/contexts/accounting/domain/IncompatibleCurrencyError";
import { Money } from "../src/contexts/_shared/domain/Money";
import chaiAsPromised from "chai-as-promised";
import { ForAccountAdministration } from "../src/contexts/administration/domain/ForAccountAdministration";
import { BankAdmin } from "../src/contexts/administration/application/BankAdmin";
import { MemoryAccountRepository } from "../src/contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { ForCreatingAccounts } from "../src/contexts/accounting/domain/ForCreatingAccounts";
import { ForExistingAccountsOperation } from "../src/contexts/accounting/domain/ForAccountsInteraction";
import { ATM } from "../src/contexts/accounting/application/ATM";
import { MemoryAdminAccountRepository } from "../src/contexts/administration/infrastructure/persistence/memory/MemoryAdminAccountRepository";
import sinon, { SinonSandbox, SinonStubbedInstance } from "sinon";
import { EventBus } from "../src/contexts/_core/domain/EventBus";
import { WithdrawalEvent } from "../src/contexts/_shared/domain/WithdrawalEvent";
import { DepositEvent } from "../src/contexts/_shared/domain/DepositEvent";
import { TestUtils } from "../../utils/TestUtils";
import { MemoryEventBus } from "../src/contexts/_core/infrastructure/bus/memory/MemoryEventBus";

chai.use(chaiAsPromised);

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe('EventBank TestAdapter', () => {
    let sandbox: SinonSandbox;
    let eventBus: SinonStubbedInstance<EventBus>;
    before(() => {
      sandbox = sinon.createSandbox();
      eventBus = sandbox.createStubInstance(MemoryEventBus);
    });
    afterEach(() => {
      sandbox.reset();
    });
    describe('Window', () => {
      let testAdapter: ForCreatingAccounts & ForExistingAccountsOperation;
      before(() => {
        testAdapter = new BankWindow(new MemoryAccountRepository(), eventBus);
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
      });

      it('should emit a DepositEvent event on deposit', async () => {
        const accountId = await testAdapter.create('John', "EUR");
        await testAdapter.deposit(accountId, 100, "EUR");
        TestUtils.assertStubCalledWithInstanceOf(eventBus.publish, DepositEvent);
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

      it('should emit a WithdrawalEvent event on withdraw', async () => {
        const accountId = await testAdapter.create('John', "EUR");
        await testAdapter.withdraw(accountId, 99, "EUR");
        TestUtils.assertStubCalledWithInstanceOf(eventBus.publish, WithdrawalEvent);
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
      before(() => {
        creationTestAdapter = new BankWindow(new MemoryAccountRepository(), eventBus);
        testAdapter = new ATM(new MemoryAccountRepository(), eventBus);
      });

      it('should deposit same currency amount', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await testAdapter.deposit(accountId, 100, "EUR");
        const account = await testAdapter.find(accountId);
        expect(account.getBalance()).to.deep.equal(new Money(100, "EUR"));
      });

      it('should emit a DepositEvent event on deposit', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await testAdapter.deposit(accountId, 100, "EUR");
        TestUtils.assertStubCalledWithInstanceOf(eventBus.publish, DepositEvent);
      });

      it('should reject deposit other currency amount', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await expect(testAdapter.deposit(accountId, 100, "USD"))
          .to.be.rejectedWith(IncompatibleCurrencyError);
      });

      it('should reject withdraw other currency amount', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await expect(testAdapter.withdraw(accountId, 99, "USD"))
          .to.be.rejectedWith(IncompatibleCurrencyError);
      });

      it('should withdraw same currency amount', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await testAdapter.deposit(accountId, 100, "EUR");
        await testAdapter.withdraw(accountId, 99, "EUR");
        const account = await testAdapter.find(accountId);
        expect(account.getBalance()).to.deep.equal(new Money(1, "EUR"));
      });

      it('should emit a WithdrawalEvent event on withdraw', async () => {
        const accountId = await creationTestAdapter.create('John', "EUR");
        await testAdapter.withdraw(accountId, 99, "EUR");
        TestUtils.assertStubCalledWithInstanceOf(eventBus.publish, WithdrawalEvent);
      });
    });

    describe('Admin', () => {
      let bankAdapter: ForCreatingAccounts;
      let adminAdapter: ForAccountAdministration;
      before(() => {
        const memoryAccountRepository = new MemoryAccountRepository();
        const memoryAdminAccountRepository = new MemoryAdminAccountRepository();

        bankAdapter = new BankWindow(memoryAccountRepository, eventBus);
        adminAdapter = new BankAdmin(memoryAdminAccountRepository);
      });

      it('should close an  account', async () => {
        const accountId = await bankAdapter.create('John', "EUR");
        await adminAdapter.close(accountId);
        const account = await adminAdapter.find(accountId);
        expect(account.isOpen()).to.equal(false);
      });

      it('should reopen an account', async () => {
        const accountId = await bankAdapter.create('John', "EUR");
        await adminAdapter.close(accountId);
        await adminAdapter.reopen(accountId);
        const account = await adminAdapter.find(accountId);
        expect(account.isOpen()).to.equal(true);
      });
    });
  });
});