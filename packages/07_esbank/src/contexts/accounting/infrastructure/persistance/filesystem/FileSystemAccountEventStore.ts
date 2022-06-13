import { FileSystemEventStore } from "../../../../_core/infrastructure/persistance/filesystem/FileSystemEventStore";
import { Account } from "../../../domain/Account";
import { AccountRepository } from "../../../domain/AccountRepository";

export class FileSystemAccountEventStore implements AccountRepository {
  private static storagePath = `${__dirname}/data/events`;
  private readonly filesystemEventStore: FileSystemEventStore<Account>;
  constructor() {
    this.filesystemEventStore = new FileSystemEventStore(FileSystemAccountEventStore.storagePath);
  }

  async create(account: Account): Promise<void> {
    await this.update(account);
  }

  async update(account: Account): Promise<void> {
    await this.filesystemEventStore.update(account);
  }

  async find(accountId: string): Promise<Account> {
    return await this.filesystemEventStore.find(Account, accountId);
  }
}