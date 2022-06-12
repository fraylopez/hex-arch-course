import { Request } from "express";
import { FindAccountQuery } from "../../../contexts/accounting/application/find/FindAccountQuery";
import { QueryBus } from "../../../contexts/_core/domain/QueryBus";
import { ExpressController } from "../../_core/http/express/ExpressController";

export class AccountGetController extends ExpressController {
  constructor(private readonly bus: QueryBus) {
    super("get", "/account/:accountId");
  }
  protected async run(req: Request) {
    const account = await this.bus.get(new FindAccountQuery(req.params.accountId));
    return {
      accountId: account.id,
      holder: account.name,
      balance: `${account.getBalance().value} ${account.getBalance().currency}`,
    };
  }
}
