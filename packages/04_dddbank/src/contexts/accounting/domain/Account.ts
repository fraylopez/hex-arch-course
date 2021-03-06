import assert from "assert";
import * as uuid from 'uuid';
import { IncompatibleCurrencyError } from "./IncompatibleCurrencyError";
import { Money } from "../../_shared/domain/Money";

export class Account {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    private balance: Money,
  ) { }

  static create(name: string, currency: string): Account {
    return new Account(uuid.v4(), name, new Money(0, currency));
  }

  static fromPrimitives(data: ReturnType<typeof Account.prototype.toPrimitives>): Account {
    return new Account(
      data.id,
      data.holder,
      Money.fromPrimitives(data.balance)
    );
  }

  withdraw(amount: Money) {
    assert(amount.sameCurrency(this.balance), new IncompatibleCurrencyError());
    this.balance = this.balance.subtract(amount);
  }

  deposit(amount: Money) {
    assert(amount.sameCurrency(this.balance), new IncompatibleCurrencyError());
    this.balance = this.balance.add(amount);
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
}

