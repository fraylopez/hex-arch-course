
import chai, { expect } from "chai";
import { BankWindow } from "../../../../src/contexts/accounting/application/BankWindow";
import chaiAsPromised from "chai-as-promised";
import { ForAccountAdministration } from "../../../../src/contexts/administration/domain/ForAccountAdministration";
import { BankAdmin } from "../../../../src/contexts/administration/application/BankAdmin";
import { MemoryAccountRepository } from "../../../../src/contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { ForCreatingAccounts } from "../../../../src/contexts/accounting/domain/ForCreatingAccounts";
import { MemoryAdminAccountRepository } from "../../../../src/contexts/administration/infrastructure/persistence/memory/MemoryAdminAccountRepository";
import sinon, { SinonSandbox, SinonStubbedInstance } from "sinon";
import { EventBus } from "../../../../src/contexts/_core/domain/EventBus";
import { TestUtils } from "../../../../../utils/TestUtils";
import { MemoryEventBus } from "../../../../src/contexts/_core/infrastructure/bus/memory/MemoryEventBus";
import * as uuid from 'uuid';

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
        const accountId = uuid.v4();
        await bankAdapter.create(accountId, 'John', "EUR");
        await adminAdapter.close(accountId);
        const account = await adminAdapter.find(accountId);
        expect(account.isOpen()).to.equal(false);
      });

      it('should reopen an account', async () => {
        const accountId = uuid.v4();
        await bankAdapter.create(accountId, 'John', "EUR");
        await adminAdapter.close(accountId);
        await adminAdapter.reopen(accountId);
        const account = await adminAdapter.find(accountId);
        expect(account.isOpen()).to.equal(true);
      });
    });
  });
});