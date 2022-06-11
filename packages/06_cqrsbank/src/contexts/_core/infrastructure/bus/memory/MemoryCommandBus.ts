import { assert } from "console";
import { Command } from "../../../domain/Command";
import { CommandBus } from "../../../domain/CommandBus";
import { CommandHandlerMap } from "../../../domain/CommandHandlerMap";

export class MemoryCommandBus implements CommandBus {
  private commandHandlersMap!: CommandHandlerMap;
  setMap(mapper: CommandHandlerMap): void {
    this.commandHandlersMap = mapper;
  }
  publish(command: Command): void {
    const handlers = this.commandHandlersMap.getHandlers(command.messageName);
    assert(handlers.length > 0, `Command ${command.messageName} is not registered`);
    assert(handlers.length < 2, `Too many command handlers for ${command.messageName}`);
    handlers[0].handle(command);
  }
}