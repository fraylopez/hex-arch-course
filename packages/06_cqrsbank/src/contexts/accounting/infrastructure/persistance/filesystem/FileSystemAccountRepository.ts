import * as fs from "fs";
import { Account } from "../../../domain/Account";
import { AccountRepository } from "../../../domain/AccountRepository";

export class FileSystemAccountRepository implements AccountRepository {
  constructor(private readonly storagePath: string) {
    this.ensureDirectoryExistence(this.storagePath);
  }

  async create(account: Account): Promise<void> {
    await this.update(account);
  }

  update(account: Account): Promise<void> {
    const data = JSON.stringify(account.toPrimitives());
    const filename = `${this.storagePath}/${account.id}.json`;
    fs.writeFileSync(filename, data, "utf8");
    return Promise.resolve();
  }

  find(accountId: string): Promise<Account> {
    const data = fs.readFileSync(`${this.storagePath}/${accountId}.json`, "utf8");
    return Promise.resolve(Account.fromPrimitives(JSON.parse(data)));
  }

  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
  }
}