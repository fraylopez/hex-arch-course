import * as readline from "readline-sync";
import { ForCreatingUsers } from "../../hexagon/ports/primary/ForCreatingUsers";
export class CLIView {
  constructor(private readonly userCreator: ForCreatingUsers) { }
  render() {
    const name = readline.question("Set your name:");
    const age = Number(readline.question("Set your age:"));

    this.userCreator.create(name, age)
      .then(() => console.log("User created!"))
      .catch((err) => console.log("Something happened", err));
  }
}