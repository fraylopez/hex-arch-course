export interface Message {
  messageName: string;
  deliveryAttempts?: number;
  [key: string]: any;
}
