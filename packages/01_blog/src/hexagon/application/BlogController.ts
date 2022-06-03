import { ForPosting as ForPosting } from "../ports/driver/ForPosting";
import { BlogRepository as BlogRepository } from "../ports/driven/BlogRepository";
import { Post } from "./Post";

export class BlogController implements ForPosting {
  constructor(private readonly blogRepository: BlogRepository) { }

  async post(author: string, content: string): Promise<void> {
    const post = new Post(author, content);
    const blog = await this.blogRepository.get();
    blog.post(post);
    await this.blogRepository.update(blog);
  }

  async read(author: string): Promise<Post[]> {
    const blog = await this.blogRepository.get();
    return blog.getNewerPosts(author);
  }

}
