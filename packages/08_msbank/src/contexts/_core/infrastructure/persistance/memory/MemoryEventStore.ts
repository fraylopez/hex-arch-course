import { DomainEvent } from "../../../domain/DomainEvent";
import { DomainEventClass } from "../../../domain/DomainEventClass";
import { EventSourcedAggregateRoot } from "../EventSourcedAggregateRoot";
import { MemoryRepository } from "./MemoryRepository";
import { StoredDomainEvent } from "../StoredDomainEvent";
import { AggregateRootWithIdConstructor } from "../AggregateRootWithIdConstructor";


export class MemoryEventStore<T extends EventSourcedAggregateRoot>  {
  private readonly eventMap: Map<string, DomainEventClass>;
  private readonly memoryRepo: MemoryRepository<StoredDomainEvent>;
  constructor() {
    this.eventMap = new Map<string, DomainEventClass>();
    this.memoryRepo = new MemoryRepository<StoredDomainEvent>();
  }

  async update(aggregateRoot: T): Promise<void> {
    await Promise.all(
      aggregateRoot.getUncommitedChanges()
        .map(event => {
          this.eventMap.set(event.messageName, event.constructor as DomainEventClass);
          return this.store(event);
        })
    );
  }

  async find(Klass: AggregateRootWithIdConstructor<T>, aggregateId: string): Promise<T | null> {
    const aggregateRoot = new Klass(aggregateId);
    const events = await this.memoryRepo.findMany({ aggregateId });
    events
      .sort((e1, e2) => e1.timestamp - e2.timestamp)
      .forEach(primitives => {
        const EventKlass = this.eventMap.get(primitives.messageName);
        aggregateRoot.handleChange(EventKlass!.fromPrimitives(primitives));
      });
    return aggregateRoot;
  }
  async clear(): Promise<void> {
    await this.memoryRepo.clear();
  }

  private async store(event: DomainEvent) {
    const primitives = event.toPrimitives();
    await this.memoryRepo.create({ ...primitives, id: primitives.eventId });
  }
}

