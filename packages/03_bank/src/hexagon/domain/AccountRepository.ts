import { Account } from "./Account";

export interface AccountRepository {
  create(account: Account): Promise<void>;
  update(account: Account): Promise<void>;
  find(accountId: string): Promise<Account>;
}
