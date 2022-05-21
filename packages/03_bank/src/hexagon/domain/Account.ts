import * as uuid from 'uuid';
import { Money } from "./Money";

export class Account {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    private readonly balance: Money,
  ) { }

  static create(name: string, currency: string): Account {
    return new Account(uuid.v4(), name, new Money(0, currency));
  }

  static deserialize(data: any): Account {
    return new Account(
      data.id,
      data.holder,
      Money.deserialize(data.balance)
    );
  }

  withdraw(amount: Money) {
    this.balance.sustract(amount);
  }
  deposit(amount: Money) {
    this.balance.add(amount);
  }

  getBalance() {
    return this.balance;
  }

  serialize() {
    return {
      id: this.id,
      holder: this.name,
      balance: this.balance.serialize(),
    };
  }
}
