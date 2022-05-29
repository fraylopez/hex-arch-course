import { Account } from "./Account";

export interface ForExistingAccountsOperation {
  find(accountId: string): Promise<Account>;
  deposit(accountId: string, amount: number, currency: string): Promise<void>;
  withdraw(accountId: string, amount: number, currency: string): Promise<void>;
}
