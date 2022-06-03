import assert from "assert";
import { Blog } from "../../application/Blog";
import { BlogRepository } from "../../ports/driven/BlogRepository";

export class MemoryPostRepository implements BlogRepository {
  private persistedBlog!: Blog;
  update(blog: Blog): Promise<void> {
    this.persistedBlog = blog;
    return Promise.resolve();
  }
  get(): Promise<Blog> {
    assert(this.persistedBlog, "Blog is not persisted");
    return Promise.resolve(this.persistedBlog || new Blog());
  }
}