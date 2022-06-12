import { DomainEvent } from "./DomainEvent";
import { MessageClass } from "./MessageClass";

export type DomainEventClass = MessageClass<DomainEvent> & { fromPrimitives: (primitives: any) => DomainEvent; };
