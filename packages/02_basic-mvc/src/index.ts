import { PostController } from "./controllers/PostController";
import { PostDAO } from "./models/dao/BlogDAO";
import { View } from "./views/View";
import { CLICreateUserView } from "./views/CLIBlog";
class App {
  private readonly view: View;
  constructor() {
    const userDAO = new PostDAO();
    const controller = new PostController(userDAO);
    this.view = new CLICreateUserView(controller);
  }

  public run(): void {
    this.view.render();
  }
}

new App().run();