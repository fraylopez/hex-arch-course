import { BlogDAO } from "../models/dao/BlogDAO";
import { PostController } from "./PostController";
import { ReadController } from "./ReadController";

export class BlogController {
  private readonly postController: PostController;
  private readonly readController: ReadController;
  constructor(dao: BlogDAO) {
    this.postController = new PostController(dao);
    this.readController = new ReadController(dao);
  }

  async post(author: string, content: string) {
    await this.postController.post(author, content);
  }

  async read(author: string) {
    return this.readController.read(author);
  }
}
