import { FileSystemRepository } from "../../../../_core/infrastructure/persistance/filesystem/FileSystemRepository";
import { Account } from "../../../domain/Account";
import { AccountRepository } from "../../../domain/AccountRepository";

type AccountPrimitives = ReturnType<typeof Account.prototype.toPrimitives>;
export class FileSystemAccountRepository implements AccountRepository {
  private readonly filesystemRepository: FileSystemRepository<AccountPrimitives>;
  constructor(storagePath: string) {
    this.filesystemRepository = new FileSystemRepository(`${storagePath}/accounts`);
  }

  async create(account: Account): Promise<void> {
    await this.filesystemRepository.create(account.toPrimitives());
  }

  async update(account: Account): Promise<void> {
    await this.filesystemRepository.update(account.toPrimitives());
  }

  async find(accountId: string): Promise<Account> {
    const data = await this.filesystemRepository.find(accountId);
    return Account.fromPrimitives(data);
  }
}