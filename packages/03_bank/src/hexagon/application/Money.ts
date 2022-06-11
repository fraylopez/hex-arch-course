import assert from "assert";

export class Money {

  constructor(
    public readonly value: number,
    public readonly currency: string
  ) { }

  static fromPrimitives(serialized: ReturnType<typeof Money.prototype.toPrimitives>): Money {
    return new Money(serialized.value, serialized.currency);
  }
  toPrimitives() {
    return {
      value: this.value,
      currency: this.currency
    };
  }

  add(amount: Money) {
    assert(this.sameCurrency(amount), new Error('Incompatible currency'));
    return new Money(this.value + amount.value, this.currency);
  }

  subtract(amount: Money) {
    assert(this.sameCurrency(amount), new Error('Incompatible currency'));
    return new Money(this.value - amount.value, this.currency);
  }
  sameCurrency(balance: Money): boolean {
    return this.currency === balance.currency;
  }
  isLessThan(amount: Money) {
    assert(this.sameCurrency(amount), new Error('Incompatible currency'));
    return this.value < amount.value;
  }
  isLessOrEqualThan(amount: Money) {
    assert(this.sameCurrency(amount), new Error('Incompatible currency'));
    return this.value <= amount.value;
  }
}
