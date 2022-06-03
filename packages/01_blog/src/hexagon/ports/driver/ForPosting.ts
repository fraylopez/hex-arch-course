import { Post } from "../../application/Post";

export interface ForPosting {
  post(author: string, content: string): Promise<void>;
  read(author: string): Promise<Post[]>;
}
