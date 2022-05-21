import { UserRepository } from "../../hexagon/ports/secondary/UserRepository";
import { User } from "../../hexagon/application/User";
import * as fs from "fs";

export class FileSystemUserRepository implements UserRepository {
  private static storagePath = `${__dirname}/data/users`;
  constructor() {
    this.ensureDirectoryExistence(FileSystemUserRepository.storagePath);
  }
  async create(user: User): Promise<void> {
    const data = JSON.stringify(user);
    const filename = `${FileSystemUserRepository.storagePath}/${user.id}.json`;
    fs.writeFileSync(filename, data, "utf8");
  }

  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
  }
}