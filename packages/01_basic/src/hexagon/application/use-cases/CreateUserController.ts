import { User } from "./User";
import { UserRepository } from "../ports/secondary/UserRepository";
import { UserCreator } from "../ports/primary/UserCreator";

export class CreateUserController implements UserCreator {
  constructor(private readonly userRepository: UserRepository) { }

  async create(name: string, age: number): Promise<void> {
    const user = new User(name, age);
    await this.userRepository.create(user);
  }
}
