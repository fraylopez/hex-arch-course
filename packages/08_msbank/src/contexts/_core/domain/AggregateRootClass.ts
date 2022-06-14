import { AggregateRoot } from "./AggregateRoot";

export interface AggregateRootClass<T extends AggregateRoot> {
  new(...args: any[]): T;
  fromPrimitives: (args: any) => T;
}
