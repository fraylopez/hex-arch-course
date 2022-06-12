import { MessageClass } from "../../../_core/domain/MessageClass";
import { QueryHandler } from "../../../_core/domain/QueryHandler";
import { Account } from "../../domain/Account";
import { ForExistingAccountsOperation } from "../../domain/ForAccountsInteraction";
import { FindAccountQuery } from "./FindAccountQuery";


export class FindAccountQueryHandler implements QueryHandler<FindAccountQuery> {
  constructor(private readonly accountFinder: ForExistingAccountsOperation) { }
  getSubscriptions(): MessageClass<FindAccountQuery>[] {
    return [FindAccountQuery];
  }
  handle(query: FindAccountQuery): Promise<Account> {
    return this.accountFinder.find(query.accountId);
  }
}
