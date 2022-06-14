import { DomainEvent, DomainEventPrimitives } from "../../_core/domain/DomainEvent";


export class AccountCreatedEvent extends DomainEvent {
  constructor(
    public readonly accountId: string,
    public readonly holder: string,
    public readonly currency: string
  ) {
    super(AccountCreatedEvent.name, accountId);
  }

  protected fromPrimitives(primitives: DomainEventPrimitives<AccountCreatedEvent>) {
    return new AccountCreatedEvent(
      primitives.aggregateId,
      primitives.payload.holder,
      primitives.payload.currency
    );
  }

  getPrimitivePayload() {
    return {
      holder: this.holder,
      currency: this.currency,
    };
  }
}
