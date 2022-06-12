import { assert } from "console";
import { Command } from "../../../domain/Command";
import { CommandBus } from "../../../domain/CommandBus";
import { CommandHandlerMap } from "../../../domain/CommandHandlerMap";
import { Message } from "../../../domain/Message";
import { MessageClass } from "../../../domain/MessageClass";

type CommandClass = MessageClass<Command> & { fromPrimitives: (primitives: any) => Command; };

export class MemoryCommandBus implements CommandBus {
  static REDELIVERY_DELAY = 100;
  static DELIVERY_ATTEMPTS = 3;
  private commandHandlersMap!: CommandHandlerMap;
  setMap(mapper: CommandHandlerMap): void {
    this.commandHandlersMap = mapper;
  }
  publish(command: Command): void {
    const handlers = this.commandHandlersMap.getHandlers(command.messageName);
    assert(handlers.length > 0, `Command ${command.messageName} is not registered`);
    assert(handlers.length < 2, `Too many command handlers for ${command.messageName}`);
    void this.transport(command.toPrimitives());
  }

  private async transport(primitive: any) {
    const handler = this.commandHandlersMap.getHandlers(primitive.messageName)[0];
    const CommandKlass = this.commandHandlersMap.getClass<CommandClass>(primitive.messageName);
    try {
      await handler.handle(CommandKlass.fromPrimitives(primitive));
    } catch (error) {
      primitive.deliveryAttempts = (primitive.deliveryAttempts || 0) + 1;
      await this.handleError(primitive, error);
    }
  }
  private async handleError(primitive: Message, error: any) {
    if (primitive.deliveryAttempts! < MemoryCommandBus.DELIVERY_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, MemoryCommandBus.REDELIVERY_DELAY));
      void this.transport(primitive);
    }
    else {
      this.handleDeadLettering(primitive, error);
    }
  }

  private handleDeadLettering(primitive: Message, error: any) {
    console.error("Dead lettering", primitive, error);
  }
}
