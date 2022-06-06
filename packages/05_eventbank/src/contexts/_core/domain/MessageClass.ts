import { Message } from "./Message";


export interface MessageClass<T extends Message> {
  new(...args: any[]): T;
  NAME: string,
  fromPrimitives(args: any): T,
}
