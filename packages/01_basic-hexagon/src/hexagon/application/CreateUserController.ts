import { User } from "./User";
import { UserRepository } from "../ports/secondary/UserRepository";

export class CreateUserController {
  constructor(private readonly userRepository: UserRepository) { }

  async create(name: string, age: number): Promise<void> {
    const user = new User(name, age);
    await this.userRepository.create(user);
  }
}
