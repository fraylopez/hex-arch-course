import { DomainError } from "./DomainError";



export type DomainErrorConstructor<T extends DomainError = DomainError> = new (...args: any[]) => T;
