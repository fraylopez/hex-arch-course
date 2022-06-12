import { Message } from "./Message";
import * as uuid from "uuid";

type PrimitivePayload<T extends DomainEvent> = ReturnType<T["getPrimitivePayload"]>;
interface DomainEventPrimitivesWithPayload<TPayload = {}> {
  messageName: string;
  aggregateId: string;
  timestamp: number;
  payload: TPayload;
  eventId: string;
}

export type DomainEventPrimitives<T extends DomainEvent> = DomainEventPrimitivesWithPayload<PrimitivePayload<T>>;


export interface DomainEvent {
  getPrimitivePayload(): object;
}

export abstract class DomainEvent implements Message {
  constructor(
    public messageName: string,
    private aggregateId: string,
    private timestamp?: number,
    private eventId?: string,
  ) {
    this.timestamp = timestamp || Date.now();
    this.eventId = eventId || uuid.v4();
  }

  static fromPrimitives(primitives: DomainEventPrimitivesWithPayload): DomainEvent {
    const e: DomainEvent = new (this as any)();
    const event = e.fromPrimitives(primitives);
    event.messageName = primitives.messageName;
    event.aggregateId = primitives.aggregateId;
    event.timestamp = primitives.timestamp;
    event.eventId = primitives.eventId;
    return event;
  }

  toPrimitives(): DomainEventPrimitivesWithPayload {
    return {
      messageName: this.messageName,
      aggregateId: this.aggregateId,
      payload: this.getPrimitivePayload?.call(this) || {},
      timestamp: this.timestamp!,
      eventId: this.eventId!,
    };
  }

  protected abstract fromPrimitives(primitives: DomainEventPrimitivesWithPayload): DomainEvent;
}
