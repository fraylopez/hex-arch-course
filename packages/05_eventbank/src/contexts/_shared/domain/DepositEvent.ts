import { Money } from "./Money";
import { DomainEvent, DomainEventPrimitives } from "../../_core/domain/DomainEvent";

export class DepositEvent extends DomainEvent {
  constructor(
    public readonly accountId: string,
    public readonly amount: Money
  ) {
    super(DepositEvent.name, accountId);
  }

  static fromPrimitives(args: DomainEventPrimitives<DepositEvent>): DomainEvent {
    return new DepositEvent(args.aggregateId, Money.fromPrimitives(args.payload.amount));
  }

  getPrimitivePayload() {
    return {
      amount: this.amount.toPrimitives(),
      type: "DepositEvent",
    };
  }
}
