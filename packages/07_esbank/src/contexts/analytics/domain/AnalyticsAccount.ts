import { AnalyticConnection } from "./AnalyticConnection";

export class AnalyticsAccount {

  public readonly id: string;
  public readonly currency: string;
  private readonly connections: AnalyticConnection[];

  constructor(accountId: string, currency: string) {
    this.id = accountId;
    this.currency = currency;
    this.connections = [];
  }

  static fromPrimitives(primitive: ReturnType<typeof AnalyticsAccount.prototype.toPrimitives>): AnalyticsAccount {
    const account = new AnalyticsAccount(primitive.accountId, primitive.currency);
    account.connections.push(...primitive.connections.map(c => AnalyticConnection.fromPrimitives(c)));
    return account;
  }

  addConnection(): void {
    this.connections.push(new AnalyticConnection());
  }

  toPrimitives() {
    return {
      accountId: this.id,
      currency: this.currency,
      connections: this.connections.map(c => c.toPrimitives())
    };
  }
}
