import { ForPosting as ForPosting } from "../ports/driver/ForPosting";
import { PostRepository as PostRepository } from "../ports/driven/PostRepository";
import { Post } from "./Post";
import { PostList } from "./PostList";

export class Blog implements ForPosting {
  constructor(private readonly postRepository: PostRepository) { }

  async post(author: string, content: string): Promise<void> {
    const post = new Post(author, content);
    await this.postRepository.post(post);
  }

  async read(author: string): Promise<PostList> {
    return await this.postRepository.findByAuthor(author);
  }

}
