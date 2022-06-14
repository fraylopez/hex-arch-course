import { MessageHandlerMap } from "./MessageHandlerMap";
import { Query } from "./Query";
import { QueryHandler } from "./QueryHandler";


export class QueryHandlerMap extends MessageHandlerMap<Query<any>, QueryHandler<Query<any>, any>> { }
