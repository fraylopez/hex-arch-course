import { Message } from "./Message";

export abstract class DomainEvent implements Message {
  static fromPrimitives: (args: any) => DomainEvent;
  readonly messageName: string;
  constructor() {
    this.messageName = this.constructor.name;
  }
  abstract toPrimitives(): object;
}
