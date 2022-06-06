import { Money } from "./Money";
import { DomainEvent } from "../../_core/domain/DomainEvent";

export class DepositEvent extends DomainEvent {

  constructor(
    public readonly accountId: string,
    public readonly amount: Money
  ) {
    super();
  }

  static fromPrimitives(args: any): DomainEvent {
    return new DepositEvent(args.accountId, Money.fromPrimitives(args.amount));
  }

  toPrimitives(): object {
    return {
      accountId: this.accountId,
      amount: this.amount.toPrimitives(),
    };
  }
}
