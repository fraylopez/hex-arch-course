import { CreateUserController } from "./controllers/CreateUserController";
import { UserDAO } from "./models/dao/UserDAO";
import { View } from "./views/View";
import { CLICreateUserView } from "./views/CLICreateUserView";
class App {
  private readonly view: View;
  constructor() {
    const userDAO = new UserDAO();
    const controller = new CreateUserController(userDAO);
    this.view = new CLICreateUserView(controller);
  }

  public run(): void {
    this.view.render();
  }
}

new App().run();