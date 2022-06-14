import { MessageHandler } from "./MessageHandler";
import { Query } from "./Query";

export type QueryHandler<T extends Query<TResult> = Query<any>, TResult = unknown> = MessageHandler<T, TResult>;
