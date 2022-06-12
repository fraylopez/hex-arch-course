import { Query } from "./Query";
import { QueryHandlerMap } from "./QueryHandlerMap";
export interface QueryBus {
  setMap(mapper: QueryHandlerMap): void;
  get<T>(command: Query<T>): Promise<T>;
}

