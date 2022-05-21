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

  sustract(amount: Money) {
    return new Money(this.value - amount.value, this.currency);
  }
}
