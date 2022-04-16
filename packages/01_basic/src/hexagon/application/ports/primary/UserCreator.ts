export interface UserCreator {
  create(name: string, age: number): Promise<void>;
}
