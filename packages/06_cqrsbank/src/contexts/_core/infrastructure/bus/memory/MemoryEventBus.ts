/* eslint-disable max-classes-per-file */
import assert from "assert";
import { DomainEventHandlerMap } from "../../../domain/DomainEventMapper";
import { DomainEvent } from "../../../domain/DomainEvent";
import { EventBus } from "../../../domain/EventBus";
import { Message } from "../../../domain/Message";
import { MessageClass } from "../../../domain/MessageClass";

export class MemoryEventBus implements EventBus {
  private mapper: DomainEventHandlerMap;

  constructor() {
    this.mapper = new DomainEventHandlerMap();
  }

  setMap(mapper: DomainEventHandlerMap): void {
    this.mapper = mapper;
  }

  publish(event: DomainEvent): void;
  publish(event: DomainEvent[]): void;
  publish(event: DomainEvent | DomainEvent[]): void {
    const events = Array.isArray(event) ? event : [event];
    void Promise.all(events.map(e => {
      this.assertMapped(e);
      return this.transport(e.toPrimitives());
    }));
  }

  private assertMapped(event: DomainEvent): void {
    this.mapper.addClass(event.constructor as MessageClass<DomainEvent>);
  }

  private async transport(serialized: Message) {
    const EventKlass = this.mapper.getClass<
      MessageClass<DomainEvent> &
      {
        fromPrimitives(primitives: any): DomainEvent;
      }
    >(serialized.messageName);
    await this.handle(EventKlass.fromPrimitives(serialized));
  }

  private async handle(event: DomainEvent): Promise<void> {
    assert(this.mapper, "mapper is not set");
    const handlers = this.mapper.getHandlers(event.messageName);
    await Promise.all(handlers.map(c => c.handle(event)));
  }
}