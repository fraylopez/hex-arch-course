import { User } from "../../application/User";

export interface UserRepository {
  create(user: User): Promise<void>;
}
