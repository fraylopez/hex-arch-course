/* eslint-disable max-classes-per-file */
import assert from "assert";
import { DomainEventMapper } from "../../../domain/DomainEventMapper";
import { DomainEvent } from "../../../domain/DomainEvent";
import { EventBus } from "../../../domain/EventBus";
import { Message } from "../../../domain/Message";

export class MemoryEventBus implements EventBus {
  private mapper!: DomainEventMapper;

  setMap(mapper: DomainEventMapper): void {
    this.mapper = mapper;
  }

  publish(event: DomainEvent): void;
  publish(event: DomainEvent[]): void;
  publish(event: DomainEvent | DomainEvent[]): void {
    const events = Array.isArray(event) ? event : [event];
    void Promise.all(events.map(e => this.transport(e.toPrimitives())));
  }

  private async transport(serialized: Message) {
    const EventKlass = this.mapper.getClass(serialized.messageName);
    await this.handle(EventKlass.fromPrimitives(serialized));
  }

  private async handle(event: DomainEvent): Promise<void> {
    assert(this.mapper, "mapper is not set");
    const handlers = this.mapper.getHandlers(event.messageName);
    await Promise.all(handlers.map(c => c.handle(event)));
  }
}