import { DomainEvent } from "./DomainEvent";
export interface EventBus {
  publish(message: DomainEvent | DomainEvent[]): void;
  publish(message: DomainEvent): void;
}
