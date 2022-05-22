import { Account } from "../domain/Account";
import { ForUsingAccounts } from "../domain/ForUsingAccounts";
import { Money } from "../domain/Money";
import { AccountRepository } from "../domain/AccountRepository";
import { UnknownAccountError } from "../domain/UnknownAccountError";
import assert from "assert";

export class Bank implements ForUsingAccounts {
  constructor(private readonly accountRepository: AccountRepository) { }

  async create(name: string, currency: string): Promise<string> {
    const account = Account.create(name, currency);
    await this.accountRepository.create(account);
    return account.id;
  }
  async find(accountId: string): Promise<Account> {
    const account = await this.accountRepository.find(accountId);
    assert(account, new UnknownAccountError(accountId));
    return account;
  }
  async deposit(accountId: string, amount: Money): Promise<void> {
    const account = await this.find(accountId);
    account.deposit(amount);
    await this.accountRepository.update(account);
  }
  async withdraw(accountId: string, amount: Money): Promise<void> {
    const account = await this.find(accountId);
    account.withdraw(amount);
    await this.accountRepository.update(account);
  }
}
