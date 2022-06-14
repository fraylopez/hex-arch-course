import { CommandHandler } from "../../../_core/domain/CommandHandler";
import { ForExistingAccountsOperation } from "../../domain/ForAccountsInteraction";
import { DepositCommand } from "./DepositCommand";

export class DepositCommandHandler implements CommandHandler<DepositCommand> {
  constructor(private readonly hexagon: ForExistingAccountsOperation) { }
  getSubscriptions() {
    return [DepositCommand];
  }
  async handle(command: DepositCommand) {
    await this.hexagon.deposit(command.accountId, command.amount, command.currency);
  }

}