import { CLIBlog as CLIBlog } from "./hexagon/adapters/driver/CLIBlog";
import { FileSystemPostRepository } from "./hexagon/adapters/driven/FileSystemPostRepository";
import { Blog } from "./hexagon/application/Blog";
import { ForPosting } from "./hexagon/ports/driver/ForPosting";
import { PostRepository } from "./hexagon/ports/driven/PostRepository";

const repositoryAdapter: PostRepository = new FileSystemPostRepository();
const hexagon: ForPosting = new Blog(repositoryAdapter);
const ui = new CLIBlog(hexagon);

ui.render();