import { Request } from "express";
import { ForExistingAccountsOperation } from "../../../contexts/accounting/domain/ForAccountsInteraction";
import { ExpressController } from "../../_core/http/express/ExpressController";

export class DepositPostController extends ExpressController {
  constructor(private readonly hexagon: ForExistingAccountsOperation) {
    super("post", "/account/deposit");
  }
  protected async run(req: Request) {
    return this.hexagon.deposit(req.body.accountId, req.body.amount, req.body.currency);
  }
}
