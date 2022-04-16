import * as uuid from 'uuid';

export class User {
  public readonly id: string;
  constructor(
    public readonly name: string,
    public readonly age: number
  ) {
    this.id = uuid.v4();

  }
}
