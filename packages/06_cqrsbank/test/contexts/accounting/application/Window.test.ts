
import chai, { expect } from "chai";
import { BankWindow } from "../../../../src/contexts/accounting/application/BankWindow";
import { IncompatibleCurrencyError } from "../../../../src/contexts/accounting/domain/IncompatibleCurrencyError";
import { Money } from "../../../../src/contexts/_shared/domain/Money";
import chaiAsPromised from "chai-as-promised";
import { MemoryAccountRepository } from "../../../../src/contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { ForCreatingAccounts } from "../../../../src/contexts/accounting/domain/ForCreatingAccounts";
import { ForExistingAccountsOperation } from "../../../../src/contexts/accounting/domain/ForAccountsInteraction";
import sinon, { SinonSandbox, SinonStubbedInstance } from "sinon";
import { EventBus } from "../../../../src/contexts/_core/domain/EventBus";
import { WithdrawalEvent } from "../../../../src/contexts/_shared/domain/WithdrawalEvent";
import { DepositEvent } from "../../../../src/contexts/_shared/domain/DepositEvent";
import { TestUtils } from "../../../../../utils/TestUtils";
import * as uuid from 'uuid';
import { MemoryEventBus } from "../../../../src/contexts/_core/infrastructure/bus/memory/MemoryEventBus";

chai.use(chaiAsPromised);

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe(`${TestUtils.getAcceptanceTestPath(__dirname, "EventBank")}`, () => {

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
      let repository: MemoryAccountRepository;

      before(() => {
        repository = new MemoryAccountRepository();
        testAdapter = new BankWindow(repository, eventBus);
      });

      afterEach(async () => {
        await repository.__deleteAll();
      });

      it('should create and retrieve an account with proposed id', async () => {
        const accountId = uuid.v4();
        await testAdapter.create(accountId, 'John', "EUR");
        const account = await testAdapter.find(accountId);
        expect(account).to.not.equal(undefined);
      });

      it('should deposit same currency amount', async () => {
        const accountId = uuid.v4();
        await testAdapter.create(accountId, 'John', "EUR");
        await testAdapter.deposit(accountId, 100, "EUR");
        const account = await testAdapter.find(accountId);
        expect(account.getBalance()).to.deep.equal(new Money(100, "EUR"));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      });

      it('should emit a DepositEvent event on deposit', async () => {
        const accountId = uuid.v4();
        await testAdapter.create(accountId, 'John', "EUR");
        await testAdapter.deposit(accountId, 100, "EUR");
        TestUtils.assertStubCalledWithInstanceOf(eventBus.publish, DepositEvent);
      });

      it('should reject deposit other currency amount', async () => {
        const accountId = uuid.v4();
        await testAdapter.create(accountId, 'John', "EUR");
        await expect(testAdapter.deposit(accountId, 100, "USD"))
          .to.be.rejectedWith(IncompatibleCurrencyError);
      });

      it('should witdraw same currency amount', async () => {
        const accountId = uuid.v4();
        await testAdapter.create(accountId, 'John', "EUR");
        await testAdapter.deposit(accountId, 100, "EUR");
        await testAdapter.withdraw(accountId, 99, "EUR");
        const account = await testAdapter.find(accountId);
        expect(account.getBalance()).to.deep.equal(new Money(1, "EUR"));
      });

      it('should emit a WithdrawalEvent event on withdraw', async () => {
        const accountId = uuid.v4();
        await testAdapter.create(accountId, 'John', "EUR");
        await testAdapter.withdraw(accountId, 99, "EUR");
        TestUtils.assertStubCalledWithInstanceOf(eventBus.publish, WithdrawalEvent);
      });

      it('should reject withdraw other currency amount', async () => {
        const accountId = uuid.v4();
        await testAdapter.create(accountId, 'John', "EUR");
        await expect(testAdapter.withdraw(accountId, 99, "USD"))
          .to.be.rejectedWith(IncompatibleCurrencyError);
      });

      it.skip('should reject withdraw more than balance', async () => {
        // TODO
      });
    });
  });
});