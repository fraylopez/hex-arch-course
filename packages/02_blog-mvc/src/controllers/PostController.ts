import { BlogDAO } from "../models/dao/BlogDAO";
import { Post } from "../models/Post";

export class PostController {
  constructor(private readonly dao: BlogDAO) { }
  async post(author: string, content: string) {
    const blog = await this.dao.get();
    blog.post(new Post(author, content));
    await this.dao.persist(blog);
  }
}

