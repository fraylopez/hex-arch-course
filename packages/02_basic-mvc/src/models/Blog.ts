import { Post } from "./Post";

export class Blog {
  constructor(private readonly posts: Post[] = []) {
  }

  static fromPrimitives(primitives: ReturnType<typeof Post.prototype.toPrimitives>[]) {
    return new Blog(primitives.map(Post.fromPrimitives));
  }

  post(post: Post) {
    this.posts.push(post);
  }

  read(author: string) {
    return this.posts.filter(post => post.author === author);
  }

  toPrimitives() {
    return this.posts.map(post => post.toPrimitives());
  }
}