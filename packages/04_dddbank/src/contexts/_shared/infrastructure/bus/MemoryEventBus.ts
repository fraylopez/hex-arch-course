interface Bus {
  publish(event: Event): void;
}

export class MemoryEventBus implements Bus {

}