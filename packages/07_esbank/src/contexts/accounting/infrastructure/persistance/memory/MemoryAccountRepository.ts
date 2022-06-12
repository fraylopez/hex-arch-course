import { DomainEventPrimitives } from "../../../../_core/domain/DomainEvent";
import { DomainEventClass } from "../../../../_core/domain/DomainEventClass";
import { MemoryRepository } from "../../../../_core/infrastructure/persistance/memory/MemoryRepository";
import { Account } from "../../../domain/Account";
import { AccountRepository } from "../../../domain/AccountRepository";

interface StoredDomainEvent extends DomainEventPrimitives<any> {
  id: string;
}

export class MemoryAccountRepository implements AccountRepository {
  private memoryRepository: MemoryRepository<StoredDomainEvent>;
  private readonly eventMap: Map<string, DomainEventClass>;
  constructor() {
    this.memoryRepository = new MemoryRepository();
    this.eventMap = new Map<string, DomainEventClass>();
  }

  async create(account: Account): Promise<void> {
    return this.update(account);
  }
  async update(account: Account): Promise<void> {
    await Promise.all(
      account.getUncommitedChanges()
        .map(event => {
          this.eventMap.set(event.messageName, event.constructor as DomainEventClass);
          const primitives = event.toPrimitives();
          const evt = {
            ...primitives,
            id: primitives.eventId,
          };
          return this.memoryRepository.create(evt);
        })
    );
  }
  async find(accountId: string): Promise<Account | null> {
    const account = new Account(accountId);
    const events = await this.memoryRepository.findMany({ aggregateId: accountId });
    events.forEach(primitives => {
      const EventKlass = this.eventMap.get(primitives.messageName);
      account.handleChange(EventKlass!.fromPrimitives(primitives));
    });
    return account;
  }

  async __deleteAll(): Promise<void> {
    return this.memoryRepository.clear();
  }
}