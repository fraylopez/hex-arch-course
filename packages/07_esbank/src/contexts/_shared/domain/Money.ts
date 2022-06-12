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
    return new Money(this.value + amount.value, this.currency);
  }

  subtract(amount: Money) {
    return new Money(this.value - amount.value, this.currency);
  }
  sameCurrency(balance: Money): unknown {
    return this.currency === balance.currency;
  }
}
