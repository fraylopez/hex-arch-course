import { EventBus } from "../../contexts/_core/domain/EventBus";
import { MemoryEventBus } from "../../contexts/_core/infrastructure/bus/memory/MemoryEventBus";

export class EventBusFactory {
  private static _instance: EventBus;
  public static get(): EventBus {
    if (!EventBusFactory._instance) {
      const bus = new MemoryEventBus();
      EventBusFactory._instance = bus;
    }
    return EventBusFactory._instance;
  }
}
