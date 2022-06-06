import { AccountCreatedEvent } from "../../accounting/domain/AccountCreatedEvent";
import { EventHandler } from "../../_core/domain/EventHandler";
import { AnalyticsRepository } from "../domain/AnalyticsRepository";
import { Tracker } from "./Tracker";

export class TrackOnAccountCreatedEventHandler implements EventHandler<AccountCreatedEvent> {
  private readonly tacker: Tracker;
  constructor(analyticsRepository: AnalyticsRepository) {
    this.tacker = new Tracker(analyticsRepository);
  }
  getSubscriptions() {
    return [AccountCreatedEvent];
  }
  async handle(event: AccountCreatedEvent): Promise<void> {
    await this.tacker.trackNewAccount(event.accountId, event.currency);
  }

}