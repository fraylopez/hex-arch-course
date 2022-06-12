import { Money } from "./Money";
import { DomainEvent, DomainEventPrimitives } from "../../_core/domain/DomainEvent";

export class DepositEvent extends DomainEvent {
  constructor(
    public readonly accountId: string,
    public readonly amount: Money
  ) {
    super(DepositEvent.name, accountId);
  }

  getPrimitivePayload() {
    return {
      amount: this.amount.toPrimitives(),
      type: "DepositEvent",
    };
  }

  protected fromPrimitives(primitives: DomainEventPrimitives<DepositEvent>): DomainEvent {
    return new DepositEvent(primitives.aggregateId, Money.fromPrimitives(primitives.payload.amount));
  }
}
