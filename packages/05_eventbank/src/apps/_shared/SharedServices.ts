import { EventBus } from "../../contexts/_core/domain/EventBus";
import { MemoryEventBus } from "../../contexts/_core/infrastructure/bus/memory/MemoryEventBus";

export class EventBusFactory {
  private static _instance: EventBus;
  public static get(config: "memory" | "rabbitmq" | "kafka" = "memory"): EventBus {
    if (!EventBusFactory._instance) {
      switch (config) {
        case "memory":
          EventBusFactory._instance = new MemoryEventBus();
          break;

        default:
          throw new Error("EventBus config unknwown");
      }
    }
    return EventBusFactory._instance;
  }
}
