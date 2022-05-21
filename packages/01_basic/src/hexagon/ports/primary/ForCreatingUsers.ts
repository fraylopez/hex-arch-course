export interface ForCreatingUsers {
  create(name: string, age: number): Promise<void>;
}
