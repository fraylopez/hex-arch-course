import { DomainEventMapper } from "./DomainEventMapper";
import { DomainEvent } from "./DomainEvent";
export interface EventBus {
  setMap(mapper: DomainEventMapper): void;
  publish(message: DomainEvent | DomainEvent[]): void;
}
