import { expect } from "chai";
import { TestUtils } from "../../../../../utils/TestUtils";
import { AccountCreatedEvent } from "../../../../src/contexts/accounting/domain/AccountCreatedEvent";
import { AnalyticsTestApp } from "./AnalyticsTestApp";

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe('Analytics', () => {
    let testAdapter: AnalyticsTestApp;
    before(() => {
      testAdapter = new AnalyticsTestApp();
    });

    it('should increment account metric on AccountCreatedEvent', async () => {
      testAdapter.publish(new AccountCreatedEvent('some-account-id', 'EUR'));
      await TestUtils.sleep();
      const eurAccounts = await testAdapter.hexagon.findAccountsPerCurrency("EUR");
      expect(eurAccounts.length).equal(1);
    });
  });
});