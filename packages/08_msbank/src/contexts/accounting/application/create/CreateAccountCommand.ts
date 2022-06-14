import { Command } from "../../../_core/domain/Command";

export class CreateAccountCommand extends Command {
  constructor(
    public readonly accountId: string,
    public readonly name: string,
    public readonly currency: string,
  ) {
    super(CreateAccountCommand.name);
  }
}
