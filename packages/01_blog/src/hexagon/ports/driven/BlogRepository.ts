import { Blog } from "../../application/Blog";
export interface BlogRepository {
  update(post: Blog): Promise<void>;
  get(): Promise<Blog>;
}
