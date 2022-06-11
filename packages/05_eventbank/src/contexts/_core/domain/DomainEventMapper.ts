import assert from "assert";
import { DomainEvent } from "./DomainEvent";
import { EventHandler } from "./EventHandler";
import { MessageClass } from "./MessageClass";

export class DomainEventMapper {
  private readonly events: Map<string, MessageClass<DomainEvent>>;
  private readonly handlers: Map<string, EventHandler[]>;
  constructor() {
    this.events = new Map();
    this.handlers = new Map();
  }
  subscribe(handler: EventHandler): void {
    handler.getSubscriptions().forEach(klass =>
      this.events.set(klass.name, klass)
    );
    const eventKlasses = handler.getSubscriptions();
    eventKlasses.forEach(eventKlass => {
      const handlersForEvent = this.handlers.get(eventKlass.name);
      if (!handlersForEvent) {
        this.handlers.set(eventKlass.name, [handler]);
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
