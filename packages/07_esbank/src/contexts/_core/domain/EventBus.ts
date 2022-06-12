import { DomainEventHandlerMap } from "./DomainEventMapper";
import { DomainEvent } from "./DomainEvent";
export interface EventBus {
  setMap(mapper: DomainEventHandlerMap): void;
  publish(message: DomainEvent | DomainEvent[]): void;
}
