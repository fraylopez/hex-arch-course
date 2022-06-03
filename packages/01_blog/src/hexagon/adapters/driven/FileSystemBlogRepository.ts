import { BlogRepository } from "../../ports/driven/BlogRepository";
import * as fs from "fs";
import { Blog } from "../../application/Blog";

export class FileSystemBlogRepository implements BlogRepository {
  private static storagePath = `${__dirname}/data/blog`;
  constructor() {
    this.ensureDirectoryExistence(FileSystemBlogRepository.storagePath);
  }
  async update(blog: Blog): Promise<void> {
    const data = JSON.stringify(blog.toPrimitives());
    const filename = `${FileSystemBlogRepository.storagePath}/blog.json`;
    await fs.promises.writeFile(filename, data, "utf8");
  }

  async get(): Promise<Blog> {
    try {
      const content = await fs.promises.readFile(`${FileSystemBlogRepository.storagePath}/blog.json`, "utf8");
      return Blog.fromPrimitives(JSON.parse(content));
    } catch (error) {
      return new Blog();
    }
  }
  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
  }
}