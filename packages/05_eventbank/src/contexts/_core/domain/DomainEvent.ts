import { Message } from "./Message";
interface PrimitivesMessage {
  messageName: string;
  [key: string]: any;
}

export interface DomainEvent {
  getPrimitivePayload?(): object;
}
export abstract class DomainEvent implements Message {
  static fromPrimitives: (args: any) => DomainEvent;
  readonly messageName: string;
  constructor() {
    this.messageName = this.constructor.name;
  }
  toPrimitives(): PrimitivesMessage {
    return {
      messageName: this.messageName,
      payload: this.getPrimitivePayload?.call(this) || {},
    };
  }
}
