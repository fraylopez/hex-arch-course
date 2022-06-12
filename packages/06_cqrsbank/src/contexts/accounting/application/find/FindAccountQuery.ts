import { Account } from "../../domain/Account";
import { Query } from "../../../_core/domain/Query";

export class FindAccountQuery extends Query<Account> {
  constructor(public readonly accountId: string) {
    super(FindAccountQuery.name);
  }
}
