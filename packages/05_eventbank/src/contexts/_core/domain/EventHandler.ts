import { DomainEvent } from "./DomainEvent";
import { MessageHandler } from "./MessageHandler";

export type EventHandler<T extends DomainEvent = DomainEvent> = MessageHandler<T>;