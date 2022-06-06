import { Account } from "../../application/Account";

export interface ForManagingAccounts {
  create(name: string, currency: string): Promise<string>;
  find(accountId: string): Promise<Account>;
  deposit(accountId: string, amount: number, currency: string): Promise<void>;
  withdraw(accountId: string, amount: number, currency: string): Promise<void>;
}
