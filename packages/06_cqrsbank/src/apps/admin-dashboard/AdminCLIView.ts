import * as readline from "readline-sync";
import { DomainError } from "../../contexts/_core/domain/DomainError";
import { AdminAccount } from "../../contexts/administration/domain/AdminAccount";
import { ForAccountAdministration } from "../../contexts/administration/domain/ForAccountAdministration";
export class AdminCLIView {
  private readonly options: Array<(onSuccess: () => void, onError: (err: Error) => void) => void>;
  constructor(private readonly admin: ForAccountAdministration) {
    this.options = [
      this.findAccount.bind(this),
      this.closeAccount.bind(this),
      this.openAccount.bind(this),
    ];
  }
  render() {
    console.log("Welcome to the Admin dashboard of DDDBank!");
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
    this.admin.find(accountId)
      .then((account: AdminAccount) => {
        console.log(`Account ${account.id}`);
        console.log(`Open: ${account.isOpen}`);
      })
      .catch(onError)
      .finally(onSuccess);
  }

  private closeAccount(onSuccess: () => void, onError: (err: Error) => void) {
    const accountId = readline.question("Account id?:");
    this.admin.close(accountId)
      .then(() => {
        console.log("Your deposit completed successfully!");
      })
      .catch(onError)
      .finally(onSuccess);
  }
  private openAccount(onSuccess: () => void, onError: (err: Error) => void) {
    const accountId = readline.question("Account id?:");
    this.admin.reopen(accountId)
      .then(() => {
        console.log("Your deposit completed successfully!");
      })
      .catch(onError)
      .finally(onSuccess);
  }
}