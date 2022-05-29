export interface ForCreatingAccounts {
  create(name: string, currency: string): Promise<string>;
}
