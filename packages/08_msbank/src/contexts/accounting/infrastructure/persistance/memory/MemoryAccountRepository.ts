import { MemoryEventStore } from "../../../../_core/infrastructure/persistance/memory/MemoryEventStore";
import { Account } from "../../../domain/Account";
import { AccountRepository } from "../../../domain/AccountRepository";

export class MemoryAccountRepository implements AccountRepository {
  private eventStore: MemoryEventStore<Account>;
  constructor() {
    this.eventStore = new MemoryEventStore();
  }
  async create(account: Account): Promise<void> {
    return this.eventStore.update(account);
  }
  async update(account: Account): Promise<void> {
    return this.eventStore.update(account);
  }
  async find(accountId: string): Promise<Account | null> {
    return this.eventStore.find(Account, accountId);
  }
  async __deleteAll(): Promise<void> {
    return this.eventStore.clear();
  }
}