import { MemoryRepository } from "../../../../_core/adapters/persistance/memory/MemoryRepository";
import { AdminAccount } from "../../../domain/AdminAccount";
import { AdminAccountRepository } from "../../../domain/AdminAccountRepository";

interface StoredAdminAccount {
  id: string;
  isOpen: boolean;
}

export class MemoryAdminAccountRepository implements AdminAccountRepository {
  private memoryRepository: MemoryRepository<StoredAdminAccount>;
  constructor() {
    this.memoryRepository = new MemoryRepository();
  }
  setMemoryRepository(memoryRepository: MemoryRepository<any>): void {
    this.memoryRepository = memoryRepository as MemoryRepository<StoredAdminAccount>;
  }

  async find(accountId: string): Promise<AdminAccount | null> {
    const stored = await this.memoryRepository.find(accountId);
    return new AdminAccount(stored!.id, stored!.isOpen);
  }
  close(account: AdminAccount): Promise<void> {
    const storable = account.serialize();
    return this.memoryRepository.update(storable);
  }
  reopen(account: AdminAccount): Promise<void> {
    const storable = account.serialize();
    return this.memoryRepository.update(storable);
  }
}