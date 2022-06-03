import { DomainEvent } from "../../_core/domain/DomainEvent";


export class AccountCreatedEvent extends DomainEvent {

  constructor(public readonly accountId: string, public readonly currency: string) {
    super();
  }

  static fromPrimitives(primitives: ReturnType<typeof AccountCreatedEvent.prototype.toPrimitives>): AccountCreatedEvent {
    return new AccountCreatedEvent(primitives['accountId'], primitives['currency']);
  }

  toPrimitives() {
    return {
      accountId: this.accountId,
      currency: this.currency,
    };
  }
}
