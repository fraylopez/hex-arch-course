import { Request } from "express";
import { DepositCommand } from "../../../contexts/accounting/application/deposit/DepositCommand";
import { CommandBus } from "../../../contexts/_core/domain/CommandBus";
import { ExpressController } from "../../_core/http/express/ExpressController";

export class DepositPostController extends ExpressController {
  constructor(private readonly commandBus: CommandBus) {
    super("post", "/deposit");
  }
  protected run(req: Request) {
    this.commandBus.publish(new DepositCommand(req.body.accountId, req.body.amount, req.body.currency));
  }
}
