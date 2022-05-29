export abstract class DomainEvent {
  static fromPrimitives: (args: any) => DomainEvent;
  readonly eventName: string;
  constructor() {
    this.eventName = this.constructor.name;
  }
  abstract toPrimitives(): object;
}
