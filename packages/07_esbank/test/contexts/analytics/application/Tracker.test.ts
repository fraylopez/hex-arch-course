import { expect } from "chai";
import { MemoryAnalyticsRepository } from "../../../../src/contexts/analytics/infrastructure/memory/MemoryAnalyticsRepository";
import { TestUtils } from "../../../../../utils/TestUtils";
import { Tracker } from "../../../../src/contexts/analytics/application/Tracker";

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe(`${TestUtils.getUnitTestPath(__dirname, Tracker)}`, () => {
    let controller: Tracker;
    let repository: MemoryAnalyticsRepository;
    before(() => {
      repository = new MemoryAnalyticsRepository();
      controller = new Tracker(repository);
    });

    it('should increment new account tracking', async () => {
      await controller.trackNewAccount('some-account-id', 'EUR');
      const accounts = await repository.findAccountsPerCurrency('EUR');
      expect(accounts.length).to.equal(1);
    });
  });
});