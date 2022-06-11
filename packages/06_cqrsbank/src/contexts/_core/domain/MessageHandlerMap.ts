import assert from "assert";
import { Message } from "./Message";
import { MessageClass } from "./MessageClass";
import { MessageHandler } from "./MessageHandler";

export class MessageHandlerMap<TMessage extends Message, THandler extends MessageHandler> {
  private readonly messages: Map<string, MessageClass<TMessage>>;
  private readonly handlers: Map<string, THandler[]>;
  constructor() {
    this.messages = new Map();
    this.handlers = new Map();
  }
  subscribe(handler: THandler): void {
    handler.getSubscriptions().forEach(klass => this.messages.set(klass.name, klass as MessageClass<TMessage>));
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

  getClass(message: string): MessageClass<TMessage> {
    assert(this.messages.has(message), `Message ${message} is not registered`);
    return this.messages.get(message)!;
  }

  getHandlers(eventName: string): THandler[] {
    return this.handlers.get(eventName) || [];
  }
}
