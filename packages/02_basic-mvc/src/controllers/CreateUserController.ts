import { UserDAO } from "../models/dao/UserDAO";
import { User } from "../models/User";

export class CreateUserController {
  constructor(private readonly dao: UserDAO) { }

  async create(name: string, age: number): Promise<void> {
    const user = new User(name, age);
    await this.dao.create(user);
  }
}

