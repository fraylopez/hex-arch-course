import { BlogController } from "./controllers/BlogController";
import { BlogDAO } from "./models/dao/BlogDAO";
import { CLIBlogView } from "./views/CLIBlog";
import { View } from "./views/View";
class App {
  private readonly view: View;
  constructor() {
    const blogDAO = new BlogDAO();
    const controller = new BlogController(blogDAO);
    this.view = new CLIBlogView(controller);
  }

  public run(): void {
    this.view.render();
  }
}

new App().run();