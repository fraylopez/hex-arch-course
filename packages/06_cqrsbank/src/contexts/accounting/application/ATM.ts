import { Account } from "../domain/Account";
import { Money } from "../../_shared/domain/Money";
import { AccountRepository } from "../domain/AccountRepository";
import { UnknownAccountError } from "../domain/UnknownAccountError";
import assert from "assert";
import { ForExistingAccountsOperation } from "../domain/ForAccountsInteraction";
import { EventBus } from "../../_core/domain/EventBus";

export class ATM implements ForExistingAccountsOperation {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly eventBus: EventBus,
  ) { }

  async find(accountId: string): Promise<Account> {
    const account = await this.accountRepository.find(accountId);
    assert(account, new UnknownAccountError(accountId));
    return account;
  }
  async deposit(accountId: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(accountId);
    account.deposit(new Money(amount, currency));
    await this.accountRepository.update(account);
    this.eventBus.publish(account.getUncommitedChanges());
  }
  async withdraw(accountId: string, amount: number, currency: string): Promise<void> {
    const account = await this.find(accountId);
    account.withdraw(new Money(amount, currency));
    await this.accountRepository.update(account);
    this.eventBus.publish(account.getUncommitedChanges());
  }
}
