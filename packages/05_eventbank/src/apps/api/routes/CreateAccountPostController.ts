import { Request } from "express";
import { ForCreatingAccounts } from "../../../contexts/accounting/domain/ForCreatingAccounts";
import { ExpressController } from "../../_core/http/express/ExpressController";

export class CreateAccountPostController extends ExpressController {
  constructor(private readonly hexagon: ForCreatingAccounts) {
    super("post", "/account");
  }
  protected async run(req: Request) {
    const accountId = await this.hexagon.create(req.body.name, req.body.currency);
    return { id: accountId };
  }
}
