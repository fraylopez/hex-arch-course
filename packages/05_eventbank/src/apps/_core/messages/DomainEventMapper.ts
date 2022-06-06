import assert from "assert";
import { DomainEvent } from "../../../contexts/_core/domain/DomainEvent";
import { EventHandler } from "../../../contexts/_core/domain/EventHandler";
import { MessageClass } from "../../../contexts/_core/domain/MessageClass";

export class DomainEventMapper {
  private readonly events: Map<string, MessageClass<DomainEvent>>;
  private readonly handlers: Map<string, EventHandler[]>;
  constructor() {
    this.events = new Map();
    this.handlers = new Map();
  }
  subscribe(handler: EventHandler): void {
    handler.getSubscriptions().forEach(klass =>
      this.events.set(klass.NAME, klass)
    );
    const eventKlasses = handler.getSubscriptions();
    eventKlasses.forEach(eventKlass => {
      const handlersForEvent = this.handlers.get(eventKlass.NAME);
      if (!handlersForEvent) {
        this.handlers.set(eventKlass.NAME, [handler]);
      } else {
        handlersForEvent.push(handler);
      }
    });
  }

  getClass(eventName: string): MessageClass<DomainEvent> {
    assert(this.events.has(eventName), `Event ${eventName} is not registered`);
    return this.events.get(eventName)!;
  }

  getHandlers(eventName: string): EventHandler[] {
    return this.handlers.get(eventName) || [];
  }
}