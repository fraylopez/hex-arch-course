import * as fs from "fs";
import { Blog } from "../Blog";
interface Persistence {
  persist(blog: Blog): Promise<void>;
}
export class BlogDAO implements Persistence {
  private static storagePath = `${__dirname}/data/blog`;
  constructor() {
    this.ensureDirectoryExistence(BlogDAO.storagePath);
  }
  async persist(blog: Blog): Promise<void> {
    const data = JSON.stringify(blog);
    const filename = `${BlogDAO.storagePath}/blog.json`;
    fs.writeFileSync(filename, data, "utf8");
  }

  async get(): Promise<Blog> {
    const filename = `${BlogDAO.storagePath}/blog.json`;
    const data = fs.readFileSync(filename, "utf8");
    return Blog.fromPrimitives(JSON.parse(data));
  }

  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
  }
}