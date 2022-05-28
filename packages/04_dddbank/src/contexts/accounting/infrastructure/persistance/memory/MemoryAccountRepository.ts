import { MemoryRepository } from "../../../../_core/adapters/persistance/memory/MemoryRepository";
import { Account } from "../../../domain/Account";
import { AccountRepository } from "../../../domain/AccountRepository";

type StoredAccount = ReturnType<typeof Account.prototype.serialize>;

export class MemoryAccountRepository implements AccountRepository {
  private memoryRepository: MemoryRepository<StoredAccount>;
  constructor() {
    this.memoryRepository = new MemoryRepository();
  }

  create(account: Account): Promise<void> {
    const storable = account.serialize();
    return this.memoryRepository.create(storable);
  }
  async update(account: Account): Promise<void> {
    const storable = account.serialize();
    return this.memoryRepository.update(storable);
  }
  async find(accountId: string): Promise<Account | null> {
    const stored = await this.memoryRepository.find(accountId);
    return Account.deserialize(stored!);
  }
}