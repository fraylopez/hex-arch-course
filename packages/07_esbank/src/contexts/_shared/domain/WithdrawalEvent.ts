import { Money } from "./Money";
import { DomainEvent, DomainEventPrimitives } from "../../_core/domain/DomainEvent";

export class WithdrawalEvent extends DomainEvent {

  constructor(
    public readonly accountId: string,
    public readonly amount: Money
  ) {
    super(WithdrawalEvent.name, accountId);
  }

  getPrimitivePayload() {
    return {
      amount: this.amount.toPrimitives(),
    };
  }
  protected fromPrimitives(primitives: DomainEventPrimitives<WithdrawalEvent>): DomainEvent {
    return new WithdrawalEvent(primitives.aggregateId, Money.fromPrimitives(primitives.payload.amount));
  }

}
