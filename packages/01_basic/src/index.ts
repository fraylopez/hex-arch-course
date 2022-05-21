import { CLIView } from "./adapters/primary/CLIView";
import { FileSystemUserRepository } from "./adapters/secondary/FileSystemUserRepository";
import { App } from "./hexagon/App";
import { ForCreatingUsers } from "./hexagon/ports/primary/ForCreatingUsers";
import { UserRepository } from "./hexagon/ports/secondary/UserRepository";

const repositoryAdapter: UserRepository = new FileSystemUserRepository();
const hexagon: ForCreatingUsers = new App(repositoryAdapter);
const ui = new CLIView(hexagon);

ui.render();