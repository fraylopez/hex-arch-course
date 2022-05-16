import { UserCreator } from "./hexagon/application/ports/primary/UserCreator";
import { UserRepository } from "./hexagon/application/ports/secondary/UserRepository";
import { CreateUserController } from "./hexagon/application/use-cases/CreateUserController";

export class App implements UserCreator {
  private readonly createUserController: CreateUserController;
  constructor(userRepository: UserRepository) {
    this.createUserController = new CreateUserController(userRepository);
  }

  async create(name: string, age: number): Promise<void> {
    await this.createUserController.create(name, age);
  }
}
