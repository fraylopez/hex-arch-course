import { Bus } from "./Bus";
import { DomainEvent } from "./DomainEvent";

export type EventBus = Bus<DomainEvent>;
