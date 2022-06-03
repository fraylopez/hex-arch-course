import { Post } from "./Post";


export class PostList {

  constructor(
    private readonly _posts: Post[]
  ) { }

  add(post: Post) {
    this.posts.push(post);
  }

  map<T>(fn: (post: Post) => T): T[] {
    return this.getSorted().map(fn);
  }

  pop() {
    return this.posts.pop();
  }

  private getSorted(): Post[] {
    return this._posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  public get posts() {
    return this.getSorted();
  }
}
