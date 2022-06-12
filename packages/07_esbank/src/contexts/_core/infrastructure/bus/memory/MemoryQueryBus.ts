import { assert } from "console";
import { Query } from "../../../domain/Query";
import { QueryBus } from "../../../domain/QueryBus";
import { QueryHandlerMap } from "../../../domain/QueryHandlerMap";

export class MemoryQueryBus implements QueryBus {
  private queryHandlersMap!: QueryHandlerMap;
  setMap(mapper: QueryHandlerMap): void {
    this.queryHandlersMap = mapper;
  }
  get<T>(query: Query<T>): Promise<T> {
    const handlers = this.queryHandlersMap.getHandlers(query.messageName);
    assert(handlers.length > 0, `Query ${query.messageName} is not registered`);
    assert(handlers.length < 2, `Too many query handlers for ${query.messageName}`);
    return handlers[0].handle(query);
  }
}
