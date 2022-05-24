import * as readline from "readline-sync";
import { Account } from "../../contexts/accounting/domain/Account";
import { DomainError } from "../../contexts/accounting/domain/DomainError";
import { ForManagingAccounts } from "../../contexts/accounting/domain/ForManagingAccounts";
export class WindowCLIView {
  private readonly options: Array<(onSuccess: () => void, onError: (err: Error) => void) => void>;
  constructor(private readonly bank: ForManagingAccounts) {
    this.options = [
      this.createAccount.bind(this),
      this.findAccount.bind(this),
      this.deposit.bind(this),
      this.withdraw.bind(this),
    ];
  }
  render() {
    console.log("Welcome to the CLI Bank!");
    console.log(`Choose an option:`);
    console.log(`${this.options.map((option, index) =>
      ` ${(index + 1)}) ${option.name.replace("bound ", "")}`).join("\n")}`);

    const option = Number(readline.question("Option:"));
    this.options[option - 1](this.render.bind(this), this.onError.bind(this));
  }
  private onError(err: Error) {
    if (err instanceof DomainError) {
      console.log(err.constructor.name);
    }
    else {
      console.log("Something failed, try again...");
    }
  }

  private createAccount(onSuccess: () => void, onError: (err: Error) => void) {
    const name = readline.question("Set your name:");
    const currency = readline.question("In wich currency do you operate?:");
    this.bank.create(name, currency)
      .then((accountId: string) => console.log(`Account ${accountId} created!`))
      .catch(onError)
      .finally(onSuccess);
  }

  private findAccount(onSuccess: () => void, onError: (err: Error) => void) {
    const accountId = readline.question("Account id:");
    this.bank.find(accountId)
      .then((account: Account) => {
        console.log(`Account ${account.id}`);
        console.log(`Holder: ${account.name}`);
        console.log(`Balance: ${account.getBalance().value} ${account.getBalance().currency}`);
      })
      .catch(onError)
      .finally(onSuccess);
  }
  private deposit(onSuccess: () => void, onError: (err: Error) => void) {
    const accountId = readline.question("Account id?:");
    const amount = readline.question("amount?:");
    const currency = readline.question("currency?:");
    this.bank.deposit(accountId, Number(amount), currency)
      .then(() => {
        console.log("Your deposit completed successfully!");
      })
      .catch(onError)
      .finally(onSuccess);
  }
  private withdraw(onSuccess: () => void, onError: (err: Error) => void) {
    const accountId = readline.question("Account id?:");
    const amount = readline.question("amount?:");
    const currency = readline.question("currency?:");
    this.bank.withdraw(accountId, Number(amount), currency)
      .then(() => {
        console.log("Your deposit completed successfully!");
      })
      .catch(onError)
      .finally(onSuccess);
  }
}