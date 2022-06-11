import * as readline from "readline-sync";
import { DomainError } from "../../contexts/_core/domain/DomainError";
import { Tracker } from "../../contexts/analytics/application/Tracker";
import { AnalyticsAccount } from "../../contexts/analytics/domain/AnalyticsAccount";
export class AnalyticsCLIView {
  private readonly options: Array<(onSuccess: () => void, onError: (err: Error) => void) => void>;
  constructor(private readonly bank: Tracker) {
    this.options = [
      this.getAccountsPerCurrency.bind(this),
    ];
  }
  render() {
    console.log("Welcome to the Analytics CLI for EventBank");
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

  private getAccountsPerCurrency(onSuccess: () => void, onError: (err: Error) => void) {
    const currency = readline.question("Currency:");
    this.bank.findAccountsPerCurrency(currency)
      .then((accounts: AnalyticsAccount[]) => {
        console.log(`${accounts.length} accounts for currency ${currency}`);
      })
      .catch(onError)
      .finally(onSuccess);
  }
}