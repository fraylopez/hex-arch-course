import { MessageHandler } from "./MessageHandler";
import { Query } from "./Query";

export type QueryHandler<T extends Query = Query> = MessageHandler<T>;
