import { Message } from "./Message";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class Query<TResult = any> implements Message {
  TRes?: TResult; // Hack for type inference on QueryBus.get
  constructor(readonly messageName: string) { }
}
