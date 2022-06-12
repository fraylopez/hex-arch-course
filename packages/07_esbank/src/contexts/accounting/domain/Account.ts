import assert from "assert";
import * as uuid from 'uuid';
import { IncompatibleCurrencyError } from "./IncompatibleCurrencyError";
import { Money } from "../../_shared/domain/Money";
import { AggregateRoot } from "../../_core/domain/AggregateRoot";
import { AccountCreatedEvent } from "./AccountCreatedEvent";
import { DepositEvent } from "../../_shared/domain/DepositEvent";
import { WithdrawalEvent } from "../../_shared/domain/WithdrawalEvent";
import { DomainEvent } from "../../_core/domain/DomainEvent";

export class Account extends AggregateRoot {
  private _name!: string;
  private balance!: Money;
  constructor(
    public readonly id: string,
    name?: string,
    balance?: Money,
  ) {
    super();
    if (name) {
      this._name = name;
    }
    if (balance) {
      this.balance = balance;
    }
  }

  static create(id: string, name: string, currency: string): Account {
    const account = new Account(id || uuid.v4(), name, new Money(0, currency));
    const event = new AccountCreatedEvent(account.id, name, currency);
    account.addUncommitedChange(event);
    account.handleChange(event);
    return account;
  }

  static fromPrimitives(data: ReturnType<typeof Account.prototype.toPrimitives>): Account {
    return new Account(
      data.id,
      data.holder,
      Money.fromPrimitives(data.balance)
    );
  }

  get name() {
    return this._name;
  }

  withdraw(amount: Money) {
    assert(amount.sameCurrency(this.balance), new IncompatibleCurrencyError());
    const event = new WithdrawalEvent(this.id, amount);
    this.addUncommitedChange(event);
    this.handleChange(event);
  }

  deposit(amount: Money) {
    assert(amount.sameCurrency(this.balance), new IncompatibleCurrencyError());
    const event = new DepositEvent(this.id, amount);
    this.addUncommitedChange(event);
    this.handleChange(event);
  }

  getBalance() {
    return this.balance;
  }

  toPrimitives() {
    return {
      id: this.id,
      holder: this.name,
      balance: this.balance.toPrimitives(),
    };
  }

  handleChange(event: DomainEvent) {
    switch (event.constructor) {
      case AccountCreatedEvent:
        this._create(event as AccountCreatedEvent);
        break;
      case DepositEvent:
        this._deposit(event as DepositEvent);
        break;
      case WithdrawalEvent:
        this._withdraw(event as WithdrawalEvent);
        break;
      default:
        throw new Error(`Unknown event type: ${event.constructor.name}`);
    }
  }

  private _create(event: AccountCreatedEvent) {
    this._name = event.holder;
    this.balance = new Money(0, event.currency);
  }
  private _deposit(event: DepositEvent) {
    this.balance = this.balance.add(event.amount);
  }
  private _withdraw(event: WithdrawalEvent) {
    this.balance = this.balance.subtract(event.amount);
  }

}


