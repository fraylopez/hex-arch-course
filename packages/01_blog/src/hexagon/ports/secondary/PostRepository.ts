import { Post } from "../../application/Post";
import { PostList } from "../../application/PostList";

export interface PostRepository {
  post(post: Post): Promise<void>;
  findByAuthor(author: string): Promise<PostList>;
}
