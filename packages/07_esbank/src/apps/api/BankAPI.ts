import { BankWindow } from "../../contexts/accounting/application/BankWindow";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { ForExistingAccountsOperation } from "../../contexts/accounting/domain/ForAccountsInteraction";
import { ForCreatingAccounts } from "../../contexts/accounting/domain/ForCreatingAccounts";
import { CommandBusFactory, EventBusFactory, QueryBusFactory } from "../_shared/SharedServices";
import { ExpressServer } from "../_core/http/express/ExpressServer";
import { CreateAccountPostController } from "./routes/CreateAccountPostController";
import { DepositPostController } from "./routes/DepositPostController";
import { AccountGetController } from "./routes/AccountGetController";
import { CommandHandlerMap } from "../../contexts/_core/domain/CommandHandlerMap";
import { CommandBus } from "../../contexts/_core/domain/CommandBus";
import { CreateAccountCommandHandler } from "../../contexts/accounting/application/create/CreateAccountCommandHandler";
import { FindAccountQueryHandler } from "../../contexts/accounting/application/find/FindAccountQueryHandler";
import { QueryHandlerMap } from "../../contexts/_core/domain/QueryHandlerMap";
import { QueryBus } from "../../contexts/_core/domain/QueryBus";
import { FileSystemAccountEventStore } from "../../contexts/accounting/infrastructure/persistance/filesystem/FileSystemAccountEventStore";
import { DepositCommandHandler } from "../../contexts/accounting/application/deposit/DepositCommandHandler";

export class BankAPI {
  private server!: ExpressServer;
  private repositoryAdapter!: AccountRepository;
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
    const commandBus = this.commandBusBindings(hexagon);
    const queryBus = this.queryBusBindings(hexagon);
    this.bindHttp(commandBus, queryBus);
  }

  private bindHexagon() {
    this.repositoryAdapter = new FileSystemAccountEventStore();
    return new BankWindow(this.repositoryAdapter, EventBusFactory.get());
  }

  private bindHttp(commandBus: CommandBus, queryBus: QueryBus) {
    this.server = new ExpressServer(3000);
    [
      new CreateAccountPostController(commandBus),
      new AccountGetController(queryBus),
      new DepositPostController(commandBus),
    ]
      .forEach(controller => this.server.addRouteController(controller));
  }

  private queryBusBindings(hexagon: ForCreatingAccounts & ForExistingAccountsOperation) {
    const queryBus = QueryBusFactory.get();
    const handlers = new QueryHandlerMap();
    handlers.subscribe(new FindAccountQueryHandler(hexagon));
    queryBus.setMap(handlers);
    return queryBus;
  }

  private commandBusBindings(hexagon: ForCreatingAccounts & ForExistingAccountsOperation) {
    const commandBus = CommandBusFactory.get();
    const commandHandlers = new CommandHandlerMap();
    commandHandlers.subscribe(new CreateAccountCommandHandler(hexagon));
    commandHandlers.subscribe(new DepositCommandHandler(hexagon));

    commandBus.setMap(commandHandlers);
    return commandBus;
  }
}
