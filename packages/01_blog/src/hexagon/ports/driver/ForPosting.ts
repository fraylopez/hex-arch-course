import { PostList } from "../../application/Blog";

export interface ForPosting {
  post(author: string, content: string): Promise<void>;
  read(author: string): Promise<PostList>;
}
