import * as readline from "readline-sync";
import { UserCreator } from "../../application/ports/primary/UserCreator";
export class CLICreateUserView {
  constructor(private readonly userCreator: UserCreator) { }
  render() {
    const name = readline.question("Set your name:");
    const age = Number(readline.question("Set your age:"));

    this.userCreator.create(name, age)
      .then(() => console.log("User created!"))
      .catch((err) => console.log("Something happened", err));
  }
}