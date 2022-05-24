import { DomainEvent } from "../../../_core/domain/DomainEvent";
import { EventBus } from "../../../_core/domain/EventBus";

export class MemoryEventBus implements EventBus {
  publish(_event: DomainEvent): void {
    throw new Error("Method not implemented.");
  }

}