import { Post } from "../../application/Post";
import { PostList } from "../../application/PostList";
import { PostRepository } from "../../ports/driven/PostRepository";

export class MemoryPostRepository implements PostRepository {
  private posts: Post[] = [];
  post(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }
  findByAuthor(author: string): Promise<PostList> {
    return Promise.resolve(new PostList(this.posts.filter(u => u.author === author)));
  }
}