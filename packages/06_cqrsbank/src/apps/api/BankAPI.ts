import { BankWindow } from "../../contexts/accounting/application/BankWindow";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { ForExistingAccountsOperation } from "../../contexts/accounting/domain/ForAccountsInteraction";
import { ForCreatingAccounts } from "../../contexts/accounting/domain/ForCreatingAccounts";
import { MemoryAccountRepository } from "../../contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { CommandBusFactory, EventBusFactory } from "../_shared/SharedServices";
import { ExpressServer } from "../_core/http/express/ExpressServer";
import { CreateAccountPostController } from "./routes/CreateAccountPostController";
import { DepositPostController } from "./routes/DepositPostController";
import { AccountGetController } from "./routes/AccountGetController";
import { CommandHandlerMap } from "../../contexts/_core/domain/CommandHandlerMap";
import { CommandBus } from "../../contexts/_core/domain/CommandBus";
import { CreateAccountCommandHandler } from "../../contexts/accounting/application/create/CreateAccountCommandHandler";

export class BankAPI {
  private server!: ExpressServer;
  private hexagon!: ForCreatingAccounts & ForExistingAccountsOperation;
  private repositoryAdapter!: AccountRepository;
  private commandBus!: CommandBus;
  constructor() {
    this.bind();
  }

  public run() {
    this.server.start();
  }
  public stop() {
    this.server.stop();
  }

  private bind() {
    const hexagon = this.bindHexagon();
    const bus = this.commandBusBindings(hexagon);
    this.bindHttp(hexagon, bus);

  }

  private bindHexagon() {
    this.repositoryAdapter = new MemoryAccountRepository();
    return new BankWindow(this.repositoryAdapter, EventBusFactory.get());
  }

  private bindHttp(hexagon: ForCreatingAccounts & ForExistingAccountsOperation, bus: CommandBus) {
    this.server = new ExpressServer(3000);
    [
      new CreateAccountPostController(bus),
      new AccountGetController(hexagon),
      new DepositPostController(hexagon),
    ]
      .forEach(controller => this.server.addRouteController(controller));
  }

  private commandBusBindings(hexagon: ForCreatingAccounts & ForExistingAccountsOperation) {
    const commandBus = CommandBusFactory.get();
    const commandHandlers = new CommandHandlerMap();
    commandHandlers.subscribe(new CreateAccountCommandHandler(hexagon));

    commandBus.setMap(commandHandlers);
    return commandBus;
  }
}
