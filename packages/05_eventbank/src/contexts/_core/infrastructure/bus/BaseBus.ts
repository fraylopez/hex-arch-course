// // eslint-disable-next-line max-classes-per-file
// interface BusMessage {
//   messageName: string;
// }

// abstract class Consumer {
//   constructor(public readonly topic: string) { }
//   abstract consume(message: BusMessage): void | Promise<void>;
// }
// class ConsumerFunctionAdapter extends Consumer {
//   constructor(public readonly topic: string, private readonly fn: ConsumerFunction) {
//     super(topic);
//   }
//   consume(message: BusMessage): void | Promise<void> {
//     return this.fn(message);
//   }
// }

// type ConsumerFunction = (message: BusMessage) => void | Promise<void>;

// interface BusTransport<T extends BusMessage = BusMessage> {
//   send(message: T): Promise<void>;
//   register(consumer: Consumer): void;
// }

// export class BaseBus {
//   private consumers: Consumer[];
//   constructor(private readonly transport: BusTransport) {
//     this.consumers = [];
//     this.transport.register(this.consume.bind(this));
//   }

//   async publish(event: BusMessage): Promise<void> {
//     await this.transport.send(event);
//   }

//   async subscribe(consumer: Consumer): Promise<void>;
//   async subscribe(consumer: ConsumerFunction, topic: string): Promise<void>;
//   async subscribe(consumer: Consumer | ConsumerFunction, topic?: string): Promise<void> {
//     if (consumer instanceof Consumer) {
//       this.consumers.push(consumer);
//     }
//     else {
//       this.consumers.push(new ConsumerFunctionAdapter(topic, consumer));
//     }
//   }

//   private async consume(message: BusMessage): Promise<void> {
//     const consumer = this.consumers.find(c => c.topic === message.messageName);
//   }
// }