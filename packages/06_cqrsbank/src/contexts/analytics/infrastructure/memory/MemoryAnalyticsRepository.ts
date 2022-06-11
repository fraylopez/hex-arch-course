import { MemoryRepository } from "../../../_core/infrastructure/persistance/memory/MemoryRepository";
import { AnalyticsAccount } from "../../domain/AnalyticsAccount";
import { AnalyticsRepository } from "../../domain/AnalyticsRepository";

interface AnalyticAccountPrimitive {
  id: string;
  currency: string;
  [key: string]: any;
}

export class MemoryAnalyticsRepository implements AnalyticsRepository {
  private memoryRepository: MemoryRepository<AnalyticAccountPrimitive>;
  constructor() {
    this.memoryRepository = new MemoryRepository();
  }
  async findAccountsPerCurrency(currency: string): Promise<AnalyticsAccount[]> {
    const primitives = await this.memoryRepository.findMany({ currency });
    return Promise.resolve(
      primitives.map(
        (primitive) => AnalyticsAccount.fromPrimitives({ ...primitive, accountId: primitive.id } as any)
      )
    );
  }
  async find(accountId: string): Promise<AnalyticsAccount | null> {
    const primitive = await this.memoryRepository.find(accountId);
    return Promise.resolve(primitive ? AnalyticsAccount.fromPrimitives({ ...primitive, accountId: primitive.id } as any) : null);
  }
  async update(account: AnalyticsAccount): Promise<void> {
    const primitive = { ...account.toPrimitives(), id: account.id };
    await this.memoryRepository.update(primitive);
  }
  async trackNewAccount(account: AnalyticsAccount): Promise<void> {
    const primitive = { ...account.toPrimitives(), id: account.id };
    await this.memoryRepository.create(primitive);
  }
}