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

  getNewerPosts(author: string): Post[] {
    return this.posts
      .filter(post => post.author === author)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  get size() {
    return this.posts.length;
  }

  toPrimitives() {
    const primitives = this.posts.map(post => post.toPrimitives());
    return primitives;
  }
}