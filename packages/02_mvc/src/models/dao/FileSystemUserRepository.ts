import * as fs from "fs";
import { User } from "../User";

export class UserDAO {
  private static storagePath = `${__dirname}/data/users`;
  constructor() {
    this.ensureDirectoryExistence(UserDAO.storagePath);
  }
  async create(user: User): Promise<void> {
    const data = JSON.stringify(user);
    const filename = `${UserDAO.storagePath}/${user.id}.json`;
    fs.writeFileSync(filename, data, "utf8");
  }

  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
  }
}