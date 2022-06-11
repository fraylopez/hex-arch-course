import { Command } from "../../../_core/domain/Command";

export class CreateAccountCommand implements Command {
  messageName: string = CreateAccountCommand.name;
  constructor(
    public readonly accountId: string,
    public readonly name: string,
    public readonly currency: string,
  ) { }

  static fromPrimitives(args: CreateAccountCommand): CreateAccountCommand {
    return new CreateAccountCommand(args.accountId, args.name, args.currency);
  }

  toPrimitives() {
    return {
      accountId: this.accountId,
      name: this.name,
      currency: this.currency,
    };
  }
}
