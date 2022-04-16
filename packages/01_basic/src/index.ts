import { CLICreateUserView } from "./hexagon/adapters/primary/CLICreateUserView";
import { FileSystemUserRepository } from "./hexagon/adapters/secondary/FileSystemUserRepository";
import { UserCreator } from "./hexagon/application/ports/primary/UserCreator";
import { UserRepository } from "./hexagon/application/ports/secondary/UserRepository";
import { CreateUserController } from "./hexagon/application/use-cases/CreateUserController";

class App {
  public static run(): void {
    const userRepository: UserRepository = new FileSystemUserRepository();
    const userCreator: UserCreator = new CreateUserController(userRepository);
    const view = new CLICreateUserView(userCreator);
    view.render();
  }
}

App.run();