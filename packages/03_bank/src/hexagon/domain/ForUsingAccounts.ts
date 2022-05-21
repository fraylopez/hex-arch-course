import { Account } from "./Account";
import { Money } from "./Money";

export interface ForUsingAccounts {
  create(name: string, currency: string): Promise<string>;
  find(accountId: string): Promise<Account>;
  deposit(accountId: string, amount: Money): Promise<void>;
  withdraw(accountId: string, amount: Money): Promise<void>;
}
