import { UserDAO } from "../models/dao/FileSystemUserRepository";
import { User } from "../models/User";

export class CreateUserController {
  constructor(private readonly dao: UserDAO) { }

  async create(name: string, age: number): Promise<void> {
    const user = new User(name, age);
    await this.dao.create(user);
  }
}
