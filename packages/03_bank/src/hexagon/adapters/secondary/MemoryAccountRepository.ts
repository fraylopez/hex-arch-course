import { Account } from "../../domain/Account";
import { AccountRepository } from "../../domain/AccountRepository";

export class MemoryAccountRepository implements AccountRepository {
  private accounts: Account[] = [];

  create(account: Account): Promise<void> {
    this.accounts.push(account);
    return Promise.resolve();
  }
  async update(account: Account): Promise<void> {
    this.accounts.splice(this.accounts.findIndex(a => a.id === account.id), 1, account);
    await this.create(account);
  }
  find(accountId: string): Promise<Account | undefined> {
    const account = this.accounts.find(a => a.id === accountId);
    return Promise.resolve(account);
  }
}