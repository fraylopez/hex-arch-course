import { Command } from "./Command";
import { CommandHandler } from "./CommandHandler";
import { MessageHandlerMap } from "./MessageHandlerMap";

export class CommandHandlerMap extends MessageHandlerMap<Command, CommandHandler> { }
