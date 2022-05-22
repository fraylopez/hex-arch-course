export class Money {



  constructor(
    public readonly value: number,
    public readonly currency: string
  ) { }

  static deserialize(balance: any): Money {
    return new Money(balance.value, balance.currency);
  }

  serialize() {
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
