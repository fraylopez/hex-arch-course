import { CLICreateUserView } from "./views/CLICreateUserView";

class App {
  public static run(): void {
    const view = new CLICreateUserView();
    view.render();
  }
}

App.run();