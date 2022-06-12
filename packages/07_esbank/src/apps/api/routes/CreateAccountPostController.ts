import { Request } from "express";
import { CommandBus } from "../../../contexts/_core/domain/CommandBus";
import { ExpressController } from "../../_core/http/express/ExpressController";
import { CreateAccountCommand } from "../../../contexts/accounting/application/create/CreateAccountCommand";

export class CreateAccountPostController extends ExpressController {
  constructor(private readonly bus: CommandBus) {
    super("post", "/account/:accountId");
  }
  protected async run(req: Request) {
    this.bus.publish(
      new CreateAccountCommand(
        req.params.accountId,
        req.body.name,
        req.body.currency
      )
    );
  }
}

