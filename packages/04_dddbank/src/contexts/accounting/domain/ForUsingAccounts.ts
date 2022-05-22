import { Account } from "./Account";

export interface ForUsingAccounts {
  create(name: string, currency: string): Promise<string>;
  find(accountId: string): Promise<Account>;
  deposit(accountId: string, amount: number, currency: string): Promise<void>;
  withdraw(accountId: string, amount: number, currency: string): Promise<void>;
}
