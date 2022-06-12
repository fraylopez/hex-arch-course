import { CommandHandlerMap } from "./CommandHandlerMap";
import { Command } from "./Command";
export interface CommandBus {
  setMap(mapper: CommandHandlerMap): void;
  publish(command: Command): void;
}
