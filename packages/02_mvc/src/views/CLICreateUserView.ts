import * as readline from "readline-sync";
import { CreateUserController } from "../controllers/CreateUserController";
import { UserDAO } from "../models/dao/UserDAO";
export class CLICreateUserView {
  private readonly createUserController: CreateUserController;
  constructor() {
    this.createUserController = new CreateUserController(new UserDAO());
  }
  render() {
    const name = readline.question("Set your name:");
    const age = Number(readline.question("Set your age:"));

    this.createUserController.create(name, age)
      .then(() => console.log("User created!"))
      .catch((err) => console.log("Something happened", err));
  }
}