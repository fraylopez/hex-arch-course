import { Account } from "./Account";
import assert from "assert";
import { AccountRepository } from "../ports/driven/AccountRepository";
import { ForManagingAccounts } from "../ports/driver/ForManagingAccounts";
import { Money } from "./Money";
import { EURRatioService } from "./EURRatioService";

export class Bank implements ForManagingAccounts {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly ratioService: EURRatioService,
  ) { }

  async create(name: string, currency: string): Promise<string> {
    const account = Account.create(name, currency);
    await this.accountRepository.create(account);
    return account.id;
  }
  async find(accountId: string): Promise<Account> {
    const account = await this.accountRepository.find(accountId);
    assert(account, new Error(`Unknown account ${accountId}`));
    return account;
  }
  async deposit(accountId: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(accountId);
    account.deposit(new Money(amount, currency));
    await this.accountRepository.update(account);
  }
  async withdraw(accountId: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(accountId);
    account.withdraw(new Money(amount, currency), this.ratioService);
    await this.accountRepository.update(account);
  }
}
