import { expect } from "chai";
import { AccountCreatedEvent } from "../../../src/contexts/accounting/domain/AccountCreatedEvent";
import { TrackOnAccountCreatedEventHandler } from "../../../src/contexts/analytics/application/TrackOnAccountCreatedEventHandler";
import { MemoryAnalyticsRepository } from "../../../src/contexts/analytics/infrastructure/memory/MemoryAnalyticsRepository";
import { TestUtils } from "../../../../utils/TestUtils";

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe('TrackOnAccountCreatedEventHandler', () => {
    let handler: TrackOnAccountCreatedEventHandler;
    let repository: MemoryAnalyticsRepository;
    before(() => {
      repository = new MemoryAnalyticsRepository();
      handler = new TrackOnAccountCreatedEventHandler(repository);
    });

    it('should increment new account tracking', async () => {
      await handler.handle(new AccountCreatedEvent('some-account-id', 'EUR'));
      const accounts = await repository.findAccountsPerCurrency('EUR');
      expect(accounts.length).to.equal(1);
    });
  });
});