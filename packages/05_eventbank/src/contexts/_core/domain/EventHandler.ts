import { DomainEvent } from "./DomainEvent";

export interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}