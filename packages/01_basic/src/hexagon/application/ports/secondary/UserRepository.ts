import { User } from "../../use-cases/User";

export interface UserRepository {
  create(user: User): Promise<void>;
}
