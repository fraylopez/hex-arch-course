import { CreateUserController } from "./application/CreateUserController";
import { ForCreatingUsers } from "./ports/primary/ForCreatingUsers";
import { UserRepository } from "./ports/secondary/UserRepository";

export class App implements ForCreatingUsers {
  private readonly createUserController: CreateUserController;
  constructor(userRepository: UserRepository) {
    this.createUserController = new CreateUserController(userRepository);
  }
  async create(name: string, age: number): Promise<void> {
    await this.createUserController.create(name, age);
  }
}
