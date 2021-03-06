import { Account } from "../domain/Account";
import { ForCreatingAccounts } from "../domain/ForCreatingAccounts";
import { Money } from "../../_shared/domain/Money";
import { AccountRepository } from "../domain/AccountRepository";
import { UnknownAccountError } from "../domain/UnknownAccountError";
import assert from "assert";
import { ForExistingAccountsOperation } from "../domain/ForAccountsInteraction";

export class BankWindow implements ForCreatingAccounts, ForExistingAccountsOperation {
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
  async deposit(accountId: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(accountId);
    account.deposit(new Money(amount, currency));
    await this.accountRepository.update(account);
  }
  async withdraw(accountId: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(accountId);
    account.withdraw(new Money(amount, currency));
    await this.accountRepository.update(account);
  }
}
