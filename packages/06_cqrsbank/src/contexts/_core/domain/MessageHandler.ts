import { Message } from "./Message";
import { MessageClass } from "./MessageClass";

export interface MessageHandler<T extends Message = Message, TReturn = void> {
  handle(message: T): TReturn | Promise<TReturn>;
  getSubscriptions(): MessageClass<T>[];
}

