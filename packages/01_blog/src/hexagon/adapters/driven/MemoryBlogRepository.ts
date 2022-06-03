import { Blog } from "../../application/Blog";
import { BlogRepository } from "../../ports/driven/BlogRepository";

export class MemoryPostRepository implements BlogRepository {
  private persistedBlog!: Blog;
  update(blog: Blog): Promise<void> {
    this.persistedBlog = blog;
    return Promise.resolve();
  }
  get(): Promise<Blog> {
    return Promise.resolve(this.persistedBlog || new Blog());
  }
}