import * as fs from "fs";
import { PersistanceQuery } from "../PersistanceQuery";

export class FileSystemRepository<T extends { id: string; }> {
  constructor(private readonly storagePath: string) {
    this.ensureDirectoryExistence(storagePath);
  }

  async create(item: T): Promise<void> {
    await this.update(item);
  }

  update(item: T): Promise<void> {
    const data = JSON.stringify(item);
    const filename = `${this.storagePath}/${item.id}.json`;
    fs.writeFileSync(filename, data, "utf8");
    return Promise.resolve();
  }

  find(id: string): Promise<T> {
    const data = fs.readFileSync(`${this.storagePath}/${id}.json`, "utf8");
    return Promise.resolve(JSON.parse(data));
  }
  async findMany(query: PersistanceQuery<T>): Promise<T[]> {
    const filenames = fs.readdirSync(`${this.storagePath}`, "utf8");
    const all = await Promise.all(filenames.map(filename => this.find(filename.split(".json")[0])));
    return all.filter(item => this.matchesQuery(item, query));
  }

  clear(): Promise<void> {
    const filenames = fs.readdirSync(`${this.storagePath}`, "utf8");
    filenames.forEach(filename => fs.unlinkSync(`${this.storagePath}/${filename}`));
    return Promise.resolve();
  }

  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
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