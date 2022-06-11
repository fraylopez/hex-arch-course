import { CommandHandlerMap } from "./CommandHandlerMap";
import { Query } from "./Query";
export interface QueryBus {
  setMap(mapper: CommandHandlerMap): void;
  get<T>(command: Query): Promise<T>;
}

