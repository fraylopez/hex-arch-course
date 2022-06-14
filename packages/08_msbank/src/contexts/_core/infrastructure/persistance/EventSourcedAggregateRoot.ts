import { AggregateRoot } from "../../domain/AggregateRoot";
import { DomainEvent } from "../../domain/DomainEvent";

export type EventSourcedAggregateRoot = AggregateRoot & { handleChange(event: DomainEvent): void; };
