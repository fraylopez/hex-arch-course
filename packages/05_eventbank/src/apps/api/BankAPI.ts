import { BankWindow } from "../../contexts/accounting/application/BankWindow";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { ForExistingAccountsOperation } from "../../contexts/accounting/domain/ForAccountsInteraction";
import { ForCreatingAccounts } from "../../contexts/accounting/domain/ForCreatingAccounts";
import { MemoryAccountRepository } from "../../contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { EventBusFactory } from "../_shared/SharedServices";
import { ExpressServer } from "../_core/http/express/ExpressServer";
import { CreateAccountPostController } from "./routes/CreateAccountPostController";
import { DepositPostController } from "./routes/DepositPostController";
import { AccountGetController } from "./routes/AccountGetController";

export class BankAPI {
  private server!: ExpressServer;
  private repositoryAdapter!: AccountRepository;
  constructor() {
    this.bind();
  }

  public run() {
    this.server.start();
  }

  private bind() {
    const hexagon = this.bindHexagon();
    this.bindHttp(hexagon);
  }

  private bindHexagon() {
    this.repositoryAdapter = new MemoryAccountRepository();
    const hexagon: ForCreatingAccounts & ForExistingAccountsOperation =
      new BankWindow(this.repositoryAdapter, EventBusFactory.get());
    return hexagon;
  }

  private bindHttp(hexagon: ForCreatingAccounts & ForExistingAccountsOperation) {
    this.server = new ExpressServer(3000);
    [
      new CreateAccountPostController(hexagon),
      new AccountGetController(hexagon),
      new DepositPostController(hexagon),
    ]
      .forEach(controller => this.server.addRouteController(controller));
  }
}



