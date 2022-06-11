import { AdminAccount } from "./AdminAccount";

export interface ForAccountAdministration {
  find(accountId: string): Promise<AdminAccount>;
  close(accountId: string): Promise<void>;
  reopen(accountId: string): Promise<void>;
}