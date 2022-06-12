export class AnalyticConnection {
  private startedAt: Date;
  constructor(startedAt?: Date) {
    this.startedAt = startedAt || new Date();
  }

  static fromPrimitives(args: ReturnType<typeof AnalyticConnection.prototype.toPrimitives>): AnalyticConnection {
    const connection = new AnalyticConnection();
    connection.startedAt = new Date(args.startedAt);
    return connection;
  }

  toPrimitives() {
    return {
      startedAt: this.startedAt.getTime()
    };
  }
}
