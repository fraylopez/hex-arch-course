import { AnalyticsRepository } from "../domain/AnalyticsRepository";

export class Tracker {
  constructor(private readonly analyticsRepository: AnalyticsRepository) { }

  async trackNewAccount(accountId: string, currency: string) {
    await this.analyticsRepository.trackNewAccount(accountId, currency);
  }
}