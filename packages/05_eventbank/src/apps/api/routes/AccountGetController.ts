import { Request } from "express";
import { ForExistingAccountsOperation } from "../../../contexts/accounting/domain/ForAccountsInteraction";
import { ExpressController } from "../../_core/http/express/ExpressController";

export class AccountGetController extends ExpressController {
  constructor(private readonly hexagon: ForExistingAccountsOperation) {
    super("get", "/account/:accountId");
  }
  protected async run(req: Request) {
    const account = await this.hexagon.find(req.params.accountId);
    return {
      accountId: account.id,
      holder: account.name,
      balance: `${account.getBalance().value} ${account.getBalance().currency}`,
    };
  }
}
