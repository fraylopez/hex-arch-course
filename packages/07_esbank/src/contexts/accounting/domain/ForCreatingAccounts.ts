export interface ForCreatingAccounts {
  create(accountId: string, name: string, currency: string): Promise<void>;
}
