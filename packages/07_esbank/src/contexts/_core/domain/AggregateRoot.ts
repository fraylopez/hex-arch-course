/* eslint-disable max-classes-per-file */
import assert from "assert";
import { DomainEvent } from "./DomainEvent";

export abstract class AggregateRoot {
  static fromPrimitives: (args: any) => AggregateRoot;
  private readonly _uncommittedChanges: DomainEvent[];
  constructor() {
    this._uncommittedChanges = [];
    assert(
      (this.constructor as typeof AggregateRoot).fromPrimitives,
      `${(typeof this).constructor.name}fromPrimitives must be implemented`
    );
  }

  addUncommitedChange(domainEvent: DomainEvent): void {
    this._uncommittedChanges.push(domainEvent);
  }

  getUncommitedChanges(): DomainEvent[] {
    return this._uncommittedChanges;
  }
  commitChanges(): DomainEvent[] {
    return this._uncommittedChanges.splice(0);
  }

  abstract toPrimitives(): object;
}
