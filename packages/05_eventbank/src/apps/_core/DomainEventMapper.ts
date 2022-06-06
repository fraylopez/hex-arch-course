import { EventHandler } from "../../contexts/_core/domain/EventHandler";

export class DomainEventMapper {
  private readonly map: Map<string, EventHandler[]>;
  constructor() {
    this.map = new Map();
  }
  subscribe(handler: EventHandler): void {
    const eventName = handler.getTopic();
    const handlers = this.map.get(eventName) || [];
    handlers.push(handler);
    this.map.set(eventName, handlers);
  }
  getHandlers(eventName: string): EventHandler[] {
    return this.map.get(eventName) || [];
  }
}