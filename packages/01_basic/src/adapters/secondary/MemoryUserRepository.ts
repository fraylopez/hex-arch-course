import { User } from "../../hexagon/application/User";
import { UserRepository } from "../../hexagon/ports/secondary/UserRepository";

export class MemoryUserRepository implements UserRepository {
  private users: User[] = [];
  create(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  findByName(name: string): Promise<User | null> {
    const user = this.users.find(u => u.name === name);
    return Promise.resolve(user || null);
  }
}