import { AccountCreatedEvent } from "../../accounting/domain/AccountCreatedEvent";
import { EventHandler } from "../../_core/domain/EventHandler";
import { Tracker } from "./Tracker";

export class TrackOnAccountCreatedEventHandler implements EventHandler<AccountCreatedEvent> {
  constructor(private readonly tacker: Tracker) { }
  getSubscriptions() {
    return [AccountCreatedEvent];
  }
  async handle(event: AccountCreatedEvent): Promise<void> {
    await this.tacker.trackNewAccount(event.accountId, event.currency);
  }

}