import { PersistanceQuery } from "../PersistanceQuery";
import { clearDataStore, dataStore } from "./data-store";
export class MemoryRepository<T extends { id: string; }>  {
  create(item: T): Promise<void> {
    dataStore.push(item);
    return Promise.resolve();
  }
  update(item: T): Promise<void> {
    const current = dataStore.find(a => a.id === item.id);
    if (!current) {
      return this.create(item);
    }
    for (const key in item) {
      if (current[key as keyof T] !== item[key as keyof T]) {
        current[key as keyof T] = item[key as keyof T];
      }
    }
    return Promise.resolve();
  }
  find(id: string): Promise<T | null> {
    const item = dataStore.find(a => a.id === id);
    return Promise.resolve(item || null);
  }
  findMany(query: PersistanceQuery<T>): Promise<T[]> {
    const matchedItems = dataStore.filter(item => this.matchesQuery(item, query));
    return Promise.resolve(matchedItems);
  }

  clear(): Promise<void> {
    clearDataStore();
    return Promise.resolve();
  }

  private matchesQuery(item: T, query: PersistanceQuery<T>): boolean {
    let match = true;
    for (const key in query) {
      match = match && item[key as keyof T] === query[key];
      if (!match) {
        return false;
      }
    }
    return true;
  }
}

