import { PostRepository } from "../../ports/driven/PostRepository";
import * as fs from "fs";
import { Post } from "../../application/Post";
import { PostList } from "../../application/PostList";

export class FileSystemPostRepository implements PostRepository {
  private static storagePath = `${__dirname}/data/posts`;
  constructor() {
    this.ensureDirectoryExistence(FileSystemPostRepository.storagePath);
  }
  async post(post: Post): Promise<void> {
    const data = JSON.stringify(post.toPrimitives());
    const filename = `${FileSystemPostRepository.storagePath}/${post.id}.json`;
    fs.writeFileSync(filename, data, "utf8");
  }

  async findByAuthor(author: string): Promise<PostList> {
    const files = fs.readdirSync(FileSystemPostRepository.storagePath);
    const posts = files.map(file => {
      const content = fs.readFileSync(`${FileSystemPostRepository.storagePath}/${file}`, "utf8");
      return Post.fromPrimitives(JSON.parse(content));
    });
    return new PostList(posts.filter(post => post.author === author));
  }
  private ensureDirectoryExistence(dirname: string) {
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(dirname, { recursive: true });
  }
}