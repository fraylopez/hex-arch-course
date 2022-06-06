import { Money } from "./Money";
import { DomainEvent } from "../../_core/domain/DomainEvent";

export class WithdrawalEvent extends DomainEvent {

  constructor(
    public readonly accountId: string,
    public readonly amount: Money
  ) {
    super();
  }

  static fromPrimitives(args: any): DomainEvent {
    return new WithdrawalEvent(args.accountId, Money.fromPrimitives(args.amount));
  }

  getPrimitivePayload(): object {
    return {
      accountId: this.accountId,
      amount: this.amount.toPrimitives(),
    };
  }
}
