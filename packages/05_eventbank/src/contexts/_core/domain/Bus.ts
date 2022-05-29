export interface Bus<T> {
  publish(event: T): void;
}
