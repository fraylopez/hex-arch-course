import * as uuid from 'uuid';

export class Post {
  public readonly id: string;
  public readonly date: Date;
  constructor(
    public readonly author: string,
    public readonly content: string,
    date?: number,
    id?: string,
  ) {
    this.id = id || uuid.v4();
    this.date = date ? new Date(date) : new Date();
  }

  static fromPrimitives(primitives: ReturnType<typeof Post.prototype.toPrimitives>): any {
    return new Post(primitives.author, primitives.content, primitives.date, primitives.id);
  }

  toPrimitives() {
    return {
      id: this.id,
      date: this.date.getTime(),
      author: this.author,
      content: this.content,
    };
  }
}
