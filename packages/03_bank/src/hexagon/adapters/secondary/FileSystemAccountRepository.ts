import * as fs from "fs";
import { Account } from "../../domain/Account";
import { AccountRepository } from "../../domain/AccountRepository";

export class FileSystemAccountRepository implements AccountRepository {
  private static storagePath = `${__dirname}/data/accounts`;
  constructor() {
    this.ensureDirectoryExistence(FileSystemAccountRepository.storagePath);
  }

  async create(account: Account): Promise<void> {
    await this.update(account);
  }

  update(account: Account): Promise<void> {
    const data = JSON.stringify(account.toPrimitives());
    const filename = `${FileSystemAccountRepository.storagePath}/${account.id}.json`;
    fs.writeFileSync(filename, data, "utf8");
    return Promise.resolve();
  }

  find(accountId: string): Promise<Account> {
    const data = fs.readFileSync(`${FileSystemAccountRepository.storagePath}/${accountId}.json`, "utf8");
    return Promise.resolve(Account.fromPrimitives(JSON.parse(data)));
  }

  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
  }
}