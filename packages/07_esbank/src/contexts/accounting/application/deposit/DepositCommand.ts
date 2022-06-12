import { Command } from "../../../_core/domain/Command";

export class DepositCommand extends Command {
  constructor(
    public readonly accountId: string,
    public readonly amount: number,
    public readonly currency: string,
  ) {
    super(DepositCommand.name);
  }
}
