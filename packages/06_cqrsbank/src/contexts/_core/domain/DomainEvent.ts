import { Message } from "./Message";

type PrimitivePayload<T extends DomainEvent> = ReturnType<T["getPrimitivePayload"]>;
interface DomainEventPrimitivesWithPayload<TPayload = {}> {
  messageName: string;
  aggregateId: string;
  timestamp: number;
  payload: TPayload;
}

export type DomainEventPrimitives<T extends DomainEvent> = DomainEventPrimitivesWithPayload<PrimitivePayload<T>>;


export interface DomainEvent {
  getPrimitivePayload(): object;
}

export abstract class DomainEvent implements Message {
  static fromPrimitives: (args: any) => DomainEvent;
  constructor(
    public readonly messageName: string,
    public readonly aggregateId: string,
    public readonly timestamp?: number,
  ) {
    this.timestamp = timestamp || Date.now();
  }
  toPrimitives(): DomainEventPrimitivesWithPayload {
    return {
      messageName: this.messageName,
      aggregateId: this.aggregateId,
      timestamp: Date.now(),
      payload: this.getPrimitivePayload?.call(this) || {},
    };
  }
}
