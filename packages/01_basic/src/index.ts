import { CLICreateUserView } from "./adapters/primary/CLICreateUserView";
import { FileSystemUserRepository } from "./adapters/secondary/FileSystemUserRepository";
import { ForCreatingUsers } from "./hexagon/ports/primary/ForCreatingUsers";
import { UserRepository } from "./hexagon/ports/secondary/UserRepository";
import { CreateUserController } from "./hexagon/application/CreateUserController";

class App {
  public static run(): void {
    const userRepository: UserRepository = new FileSystemUserRepository();
    const userCreator: ForCreatingUsers = new CreateUserController(userRepository);
    const view = new CLICreateUserView(userCreator);
    view.render();
  }
}

App.run();