import { Command } from "./Command";
import { MessageHandler } from "./MessageHandler";

export type CommandHandler<T extends Command = Command> = MessageHandler<T>;

