import { Account } from "../domain/Account";
import { ForUsingAccounts } from "../domain/ForUsingAccounts";
import { Money } from "../domain/Money";
import { AccountRepository } from "../domain/AccountRepository";
import { UnknownAccountError } from "./UnknownAccountError";

export class Bank implements ForUsingAccounts {
  constructor(private readonly accountRepository: AccountRepository) { }

  async create(name: string, currency: string): Promise<string> {
    const account = Account.create(name, currency);
    await this.accountRepository.create(account);
    return account.id;
  }
  async find(accountId: string): Promise<Account> {
    const account = await this.accountRepository.find(accountId);
    if (!account) {
      throw new UnknownAccountError();
    }
    return account;
  }
  async deposit(accountId: string, amount: Money): Promise<void> {
    const account = await this.find(accountId);
    account.deposit(amount);
  }
  async withdraw(accountId: string, amount: Money): Promise<void> {
    const account = await this.find(accountId);
    account.withdraw(amount);
  }
}
