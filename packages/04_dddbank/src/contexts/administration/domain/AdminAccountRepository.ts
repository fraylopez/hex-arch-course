import { AdminAccount } from "./AdminAccount";

export interface AdminAccountRepository {
  find(accountId: string): Promise<AdminAccount | null>;
  close(account: AdminAccount): Promise<void>;
  reopen(account: AdminAccount): Promise<void>;
}