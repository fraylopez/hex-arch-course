import { DomainEvent, DomainEventPrimitives } from "../../_core/domain/DomainEvent";


export class AccountCreatedEvent extends DomainEvent {
  constructor(public readonly accountId: string, public readonly holder: string, public readonly currency: string) {
    super(AccountCreatedEvent.name, accountId);
  }

  static fromPrimitives(primitives: DomainEventPrimitives<AccountCreatedEvent>) {
    return new AccountCreatedEvent(primitives.aggregateId, primitives.payload.holder, primitives.payload.currency);
  }

  getPrimitivePayload() {
    return {
      currency: this.currency,
      holder: this.holder,
    };
  }
}
