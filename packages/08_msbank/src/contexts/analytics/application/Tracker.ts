import assert from "assert";
import { AnalyticsAccount } from "../domain/AnalyticsAccount";
import { AnalyticsRepository } from "../domain/AnalyticsRepository";

export class Tracker {
  constructor(private readonly analyticsRepository: AnalyticsRepository) { }

  async trackNewAccount(accountId: string, currency: string) {
    const account = new AnalyticsAccount(accountId, currency);
    await this.analyticsRepository.trackNewAccount(account);
  }

  async trackConnection(accountId: string) {
    const account = await this.analyticsRepository.find(accountId);
    assert(account, `Account ${accountId} not found`);
    account.addConnection();
    await this.analyticsRepository.update(account);
  }

  async findAccountsPerCurrency(currency: string) {
    const accounts = await this.analyticsRepository.findAccountsPerCurrency(currency);
    return accounts;
  }
}