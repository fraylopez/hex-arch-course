/* eslint-disable max-classes-per-file */
import { CommandBus } from "../../contexts/_core/domain/CommandBus";
import { EventBus } from "../../contexts/_core/domain/EventBus";
import { MemoryCommandBus } from "../../contexts/_core/infrastructure/bus/memory/MemoryCommandBus";
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
export class CommandBusFactory {
  private static _instance: CommandBus;
  public static get(): CommandBus {
    if (!CommandBusFactory._instance) {
      const bus = new MemoryCommandBus();
      CommandBusFactory._instance = bus;
    }
    return CommandBusFactory._instance;
  }
}
