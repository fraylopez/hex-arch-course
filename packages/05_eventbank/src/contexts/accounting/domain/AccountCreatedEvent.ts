import { DomainEvent } from "../../_core/domain/DomainEvent";


export class AccountCreatedEvent extends DomainEvent {
  static NAME = 'AccountCreatedEvent';
  constructor(public readonly accountId: string, public readonly currency: string) {
    super();
  }

  static fromPrimitives(primitives: ReturnType<typeof AccountCreatedEvent.prototype.getPrimitivePayload>): AccountCreatedEvent {
    return new AccountCreatedEvent(primitives['accountId'], primitives['currency']);
  }

  getPrimitivePayload() {
    return {
      accountId: this.accountId,
      currency: this.currency,
    };
  }
}
