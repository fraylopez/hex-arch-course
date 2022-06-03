import { PostList } from "../../application/PostList";

export interface ForPosting {
  post(author: string, content: string): Promise<void>;
  read(author: string): Promise<PostList>;
}
