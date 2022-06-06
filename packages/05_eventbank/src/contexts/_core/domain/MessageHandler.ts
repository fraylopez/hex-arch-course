import { Message } from "./Message";

export interface MessageHandler<T extends Message = Message> {
  handle<TReturn = void>(event: T): TReturn;
  handle<TReturn = void>(event: T): Promise<TReturn>;
  getTopic(): string;
}
