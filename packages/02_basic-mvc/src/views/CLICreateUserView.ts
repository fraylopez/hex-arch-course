import * as readline from "readline-sync";
import { CreateUserController } from "../controllers/CreateUserController";
export class CLICreateUserView {
  constructor(private readonly createUserController: CreateUserController) {
  }
  render() {
    const name = readline.question("Set your name:");
    const age = Number(readline.question("Set your age:"));

    this.createUserController.create(name, age)
      .then(() => console.log("User created!"))
      .catch((err) => console.log("Something happened", err));
  }
}