import { AnalyticsAccount } from "./AnalyticsAccount";

export interface AnalyticsRepository {
  find(accountId: string): Promise<AnalyticsAccount | null>;
  findAccountsPerCurrency(currency: string): Promise<AnalyticsAccount[]>;
  trackNewAccount(account: AnalyticsAccount): Promise<void>;
  update(account: AnalyticsAccount): Promise<void>;
}
