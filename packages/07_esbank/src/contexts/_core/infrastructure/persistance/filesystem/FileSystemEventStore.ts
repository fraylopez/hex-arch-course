import { AggregateRootClass } from "../../../domain/AggregateRootClass";
import { DomainEvent } from "../../../domain/DomainEvent";
import { DomainEventClass } from "../../../domain/DomainEventClass";
import { AggregateRootWithIdConstructor } from "../AggregateRootWithIdConstructor";
import { EventSourcedAggregateRoot } from "../EventSourcedAggregateRoot";
import { PersistanceQuery } from "../PersistanceQuery";
import { StoredDomainEvent } from "../StoredDomainEvent";
import { FileSystemRepository } from "./FileSystemRepository";

export class FileSystemEventStore<T extends EventSourcedAggregateRoot> {
  private readonly filesystemRepo: FileSystemRepository<StoredDomainEvent>;
  private readonly eventMap: Map<string, DomainEventClass>;
  constructor(private readonly storagePath: string) {
    this.filesystemRepo = new FileSystemRepository(storagePath);
    this.eventMap = new Map<string, DomainEventClass>();
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

  async find(Klass: AggregateRootWithIdConstructor<T>, aggregateId: string): Promise<T> {
    const aggregateRoot = new Klass(aggregateId);
    const events = await this.filesystemRepo.findMany({ aggregateId });
    events
      .sort((e1, e2) => e1.timestamp - e2.timestamp)
      .forEach(primitives => {
        const EventKlass = this.eventMap.get(primitives.messageName);
        aggregateRoot.handleChange(EventKlass!.fromPrimitives(primitives));
      });
    return aggregateRoot;
  }

  async findMany(Klass: AggregateRootClass<T>, query: PersistanceQuery<StoredDomainEvent>): Promise<T[]> {
    const matchedItems = await this.filesystemRepo.findMany(query);
    return Promise.all(matchedItems.map(item => this.find(Klass, item.aggregateId)));
  }

  async clear(): Promise<void> {
    await this.filesystemRepo.clear();
  }

  private async store(event: DomainEvent) {
    const primitives = event.toPrimitives();
    await this.filesystemRepo.create({ ...primitives, id: primitives.eventId });
  }
}