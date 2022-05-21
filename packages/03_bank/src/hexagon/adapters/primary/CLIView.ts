import * as readline from "readline-sync";
import { Account } from "../../domain/Account";
import { ForUsingAccounts } from "../../domain/ForUsingAccounts";
export class CLIView {
  private readonly options: Array<() => void>;
  constructor(private readonly bank: ForUsingAccounts) {
    this.options = [
      this.createAccount.bind(this),
      this.findAccount.bind(this),
    ];
  }
  render() {
    console.log("Welcome to the CLI Bank!");
    console.log(`Choose an option:`);
    console.log(`${this.options.map((option, index) =>
      ` ${(index + 1)}) ${option.name.replace("bound ", "")}`).join("\n")}`);

    const option = Number(readline.question("Option:"));
    this.options[option - 1]();
  }

  private createAccount() {
    const name = readline.question("Set your name:");
    const currency = readline.question("In wich currency do you operate?:");
    this.bank.create(name, currency)
      .then((accountId: string) => console.log(`Account ${accountId} created!`))
      .catch((err) => console.log("Something happened", err));
  }

  private findAccount() {
    const accountId = readline.question("Account id:");
    this.bank.find(accountId)
      .then((account: Account) => {
        console.log(`Account ${account.id}`);
        console.log(`Holder: ${account.name}`);
        console.log(`Balance: ${account.getBalance().value} ${account.getBalance().currency}`);
      })
      .catch((err) => console.log("Something happened", err));
  }
}