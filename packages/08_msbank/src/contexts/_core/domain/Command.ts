import { Message } from "./Message";

export abstract class Command implements Message {
  constructor(readonly messageName: string) { }

  static fromPrimitives(primitives: any) {
    const message = new (this as any)();
    Object.assign(message, primitives);
    return message;
  }

  toPrimitives() {
    return JSON.parse(JSON.stringify(this));
  }

}
