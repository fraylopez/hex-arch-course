import { BankWindow } from "../../contexts/accounting/application/BankWindow";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { ForExistingAccountsOperation } from "../../contexts/accounting/domain/ForAccountsInteraction";
import { ForCreatingAccounts } from "../../contexts/accounting/domain/ForCreatingAccounts";
import { WindowCLIView } from "./WindowCLIView";
import { MemoryAccountRepository } from "../../contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { EventBusFactory } from "../_shared/SharedServices";

export class BankWindowApp {
  private ui!: WindowCLIView;
  constructor() {
    this.createBindings();
  }

  public run(): void {
    this.ui.render();
  }

  private createBindings(): void {
    const repositoryAdapter: AccountRepository = new MemoryAccountRepository();
    const hexagon: ForCreatingAccounts & ForExistingAccountsOperation =
      new BankWindow(repositoryAdapter, EventBusFactory.get("memory"));
    this.ui = new WindowCLIView(hexagon);
  }
}
