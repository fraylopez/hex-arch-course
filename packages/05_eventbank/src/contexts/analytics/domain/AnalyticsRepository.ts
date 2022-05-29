export interface AnalyticsRepository {
  trackNewAccount(accountId: string, currency: string): Promise<void>;
}
