import { DomainEvent } from "../../../domain/DomainEvent";
import { EventBus } from "../../../domain/EventBus";

export class MemoryEventBus implements EventBus {
  publish(_event: DomainEvent): void {
    throw new Error("Method not implemented.");
  }

}