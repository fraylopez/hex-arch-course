/* eslint-disable max-classes-per-file */
import assert from "assert";
import * as uuid from 'uuid';
import { EURRatioService } from "./EURRatioService";
import { Money } from "./Money";

export class Account {
  private static MAX_CREDIT_IN_EUROS = 10;
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

  withdraw(amount: Money, ratioService: EURRatioService) {
    assert(amount.sameCurrency(this.balance), new Error('Incompatible currency'));
    const maxAmountWithdrawable = this.getMaxAmountWithdrawable(amount, ratioService);
    assert(amount.isLessOrEqualThan(maxAmountWithdrawable), new Error('Insufficient funds'));
    this.balance = this.balance.subtract(amount);
  }

  deposit(amount: Money) {
    Assert.that(() => amount.sameCurrency(this.balance), new Error('Incompatible currency'));
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

  private getMaxAmountWithdrawable(requested: Money, ratioService: EURRatioService) {
    const maxCreditInRequestedCurrency =
      this.getMaxCreditInRequestedCurrency(requested, ratioService);
    return this.balance.add(maxCreditInRequestedCurrency);
  }

  private getMaxCreditInRequestedCurrency(requested: Money, ratioService: EURRatioService) {
    const ratioEurRequestedCurrency = ratioService.getEURRatioForCurrency(requested.currency);
    return new Money(
      Account.MAX_CREDIT_IN_EUROS * ratioEurRequestedCurrency,
      requested.currency
    );
  }
}

class Assert {
  static that(fn: () => boolean, err?: Error) {
    if (!fn()) {
      return err || new Error("Assertion failed");
    }
  }
}
