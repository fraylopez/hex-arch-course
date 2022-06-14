import { DomainEvent } from "./DomainEvent";
import { EventHandler } from "./EventHandler";
import { MessageHandlerMap } from "./MessageHandlerMap";

export class DomainEventHandlerMap extends MessageHandlerMap<DomainEvent, EventHandler>{ }
