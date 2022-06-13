import { FileSystemRepository } from "../../../../_core/infrastructure/persistance/filesystem/FileSystemRepository";
import { Account } from "../../../domain/Account";
import { AccountRepository } from "../../../domain/AccountRepository";

type AccountPrimitives = ReturnType<typeof Account.prototype.toPrimitives>;
export class FileSystemAccountRepository implements AccountRepository {
  private static storagePath = `${__dirname}/data/accounts`;
  private readonly filesystemRepository: FileSystemRepository<AccountPrimitives>;
  constructor() {
    this.filesystemRepository = new FileSystemRepository(FileSystemAccountRepository.storagePath);
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