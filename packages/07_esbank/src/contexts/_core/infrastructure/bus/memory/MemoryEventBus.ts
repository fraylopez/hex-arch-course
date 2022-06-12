/* eslint-disable max-classes-per-file */
import assert from "assert";
import { DomainEventHandlerMap } from "../../../domain/DomainEventMapper";
import { DomainEvent } from "../../../domain/DomainEvent";
import { EventBus } from "../../../domain/EventBus";
import { Message } from "../../../domain/Message";
import { DomainEventClass } from "../../../domain/DomainEventClass";

export class MemoryEventBus implements EventBus {
  private mapper!: DomainEventHandlerMap;

  setMap(mapper: DomainEventHandlerMap): void {
    this.mapper = mapper;
  }

  publish(event: DomainEvent): void;
  publish(event: DomainEvent[]): void;
  publish(event: DomainEvent | DomainEvent[]): void {
    const events = Array.isArray(event) ? event : [event];
    void Promise.all(events.map(e => this.transport(e.toPrimitives())));
  }

  private async transport(serialized: Message) {
    const EventKlass = this.mapper.getClass<DomainEventClass>(serialized.messageName);
    await this.handle(EventKlass.fromPrimitives(serialized));
  }

  private async handle(event: DomainEvent): Promise<void> {
    assert(this.mapper, "mapper is not set");
    const handlers = this.mapper.getHandlers(event.messageName);
    await Promise.all(handlers.map(c => c.handle(event)));
  }
}