import * as fs from "fs";
import { AdminAccount } from "../../../domain/AdminAccount";
import { AdminAccountRepository } from "../../../domain/AdminAccountRepository";

export class FileSystemAdminAccountRepository implements AdminAccountRepository {
  private static storagePath = `${__dirname}/data/accounts`;
  constructor() {
    this.ensureDirectoryExistence(FileSystemAdminAccountRepository.storagePath);
  }

  reopen(account: AdminAccount): Promise<void> {
    const data = JSON.stringify(account.serialize());
    const filename = `${FileSystemAdminAccountRepository.storagePath}/${account.id}.json`;
    fs.writeFileSync(filename, data, "utf8");
    return Promise.resolve();
  }
  close(account: AdminAccount): Promise<void> {
    const data = JSON.stringify(account.serialize());
    const filename = `${FileSystemAdminAccountRepository.storagePath}/${account.id}.json`;
    fs.writeFileSync(filename, data, "utf8");
    return Promise.resolve();
  }

  find(accountId: string): Promise<AdminAccount> {
    const data = fs.readFileSync(`${FileSystemAdminAccountRepository.storagePath}/${accountId}.json`, "utf8");
    return Promise.resolve(AdminAccount.deserialize(JSON.parse(data)));
  }

  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
  }
}