import { AccountCreatedEvent } from "../../accounting/domain/AccountCreatedEvent";
import { EventHandler } from "../../_core/domain/EventHandler";

export class TrackOnAccountCreatedEventHandler implements EventHandler<AccountCreatedEvent> {
  handle(_event: AccountCreatedEvent): Promise<void> {
    throw new Error("Method not implemented.");
  }

}