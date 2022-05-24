
export class MemoryRepository<T extends { id: string; }>  {
  private items: T[] = [];

  create(item: T): Promise<void> {
    this.items.push(item);
    return Promise.resolve();
  }
  update(item: T): Promise<void> {
    const current = this.items.find(a => a.id === item.id);
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
    const item = this.items.find(a => a.id === id);
    return Promise.resolve(item || null);
  }
  findMany(query: keyof T): Promise<T[]> {
    const matchedItems = this.items.filter(item => this.matchesQuery(item, query));
    return Promise.resolve(matchedItems);
  }

  private matchesQuery(item: T, query: any): boolean {
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