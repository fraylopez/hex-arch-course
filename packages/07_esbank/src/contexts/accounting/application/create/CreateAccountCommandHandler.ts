import { CommandHandler } from "../../../_core/domain/CommandHandler";
import { ForCreatingAccounts } from "../../domain/ForCreatingAccounts";
import { CreateAccountCommand } from "./CreateAccountCommand";

export class CreateAccountCommandHandler implements CommandHandler<CreateAccountCommand> {
  constructor(private readonly hexagon: ForCreatingAccounts) { }
  getSubscriptions() {
    return [CreateAccountCommand];
  }
  async handle(command: CreateAccountCommand) {
    await this.hexagon.create(command.accountId, command.name, command.currency);
  }

}