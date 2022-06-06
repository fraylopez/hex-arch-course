/* eslint-disable max-classes-per-file */
import { BankWindow } from "../../contexts/accounting/application/BankWindow";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { ForExistingAccountsOperation } from "../../contexts/accounting/domain/ForAccountsInteraction";
import { ForCreatingAccounts } from "../../contexts/accounting/domain/ForCreatingAccounts";
import { MemoryAccountRepository } from "../../contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { ExpressServer } from "../_core/ExpressServer";
import { EventBusFactory } from "../_shared/SharedServices";


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
      new BankWindow(this.repositoryAdapter, EventBusFactory.get("memory"));
    return hexagon;
  }

  private bindHttp(hexagon: ForCreatingAccounts & ForExistingAccountsOperation) {
    this.server = new ExpressServer(3000);

    this.server.addRoute("post", "/accounts", (req, res) => {
      hexagon.create(req.body.name, req.body.currency)
        .then(id => res.send({ id }))
        .catch(err => res.status(500).send({ error: err.message }));
    });
  }


}


