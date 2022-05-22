export interface Bus<T> {
  publish(event: T): void;
}


export type EventBus = Bus<DomainEvent>;


abstract class DomainEvent {
  abstract readonly eventName: string;
}

