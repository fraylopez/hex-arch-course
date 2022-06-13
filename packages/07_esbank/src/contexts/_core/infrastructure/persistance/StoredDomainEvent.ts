import { DomainEventPrimitives } from "../../domain/DomainEvent";

export interface StoredDomainEvent extends DomainEventPrimitives<any> {
  id: string;
  aggregateId: string;
}
