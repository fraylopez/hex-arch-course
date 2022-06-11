import { Message } from "./Message";
import { MessageClass } from "./MessageClass";

export interface MessageHandler<T extends Message = Message> {
  handle<TReturn = void>(event: T): TReturn;
  handle<TReturn = void>(event: T): Promise<TReturn>;
  getSubscriptions(): MessageClass<T>[];
}

