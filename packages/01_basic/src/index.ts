import { App } from "./App";
import { CLICreateUserView } from "./hexagon/adapters/primary/CLICreateUserView";
import { FileSystemUserRepository } from "./hexagon/adapters/secondary/FileSystemUserRepository";
import { UserCreator } from "./hexagon/application/ports/primary/UserCreator";
import { UserRepository } from "./hexagon/application/ports/secondary/UserRepository";

const repositoryAdapter: UserRepository = new FileSystemUserRepository();
const hexagon: UserCreator = new App(repositoryAdapter);
const ui = new CLICreateUserView(hexagon);

ui.render();