import assert from "assert";
import { UnknownAccountError } from "../../_shared/domain/UnknownAccountError";
import { AdminAccount } from "../domain/AdminAccount";
import { AdminAccountRepository } from "../domain/AdminAccountRepository";
import { ForAccountAdministration } from "../domain/ForAccountAdministration";

export class BankAdmin implements ForAccountAdministration {
  constructor(private readonly adminAccountRepository: AdminAccountRepository) { }

  async find(accountId: string): Promise<AdminAccount> {
    const account = await this.adminAccountRepository.find(accountId);
    assert(account, new UnknownAccountError());
    return account;
  }

  async close(accountId: string): Promise<void> {
    const account = await this.adminAccountRepository.find(accountId);
    assert(account, new UnknownAccountError());
    account.close();
    await this.adminAccountRepository.close(account);
  }

  async reopen(accountId: string): Promise<void> {
    const account = await this.adminAccountRepository.find(accountId);
    assert(account, new UnknownAccountError());
    account.open();
    await this.adminAccountRepository.reopen(account);
  }
}