import * as readline from "readline-sync";
import { Account } from "../../contexts/accounting/domain/Account";
import { DomainError } from "../../contexts/accounting/domain/DomainError";
import { ForExistingAccountsOperation } from "../../contexts/accounting/domain/ForAccountsInteraction";
export class ATMCLIView {
  private readonly options: Array<(onSuccess: () => void, onError: (err: Error) => void) => void>;
  constructor(private readonly bank: ForExistingAccountsOperation) {
    this.options = [
      this.findAccount.bind(this),
      this.deposit.bind(this),
      this.withdraw.bind(this),
    ];
  }
  render() {
    console.log("Welcome to the ATM of DDDBank!");
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