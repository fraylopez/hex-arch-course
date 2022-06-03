import { CLIBlog as CLIBlog } from "./hexagon/adapters/driver/CLIBlog";
import { FileSystemBlogRepository } from "./hexagon/adapters/driven/FileSystemBlogRepository";
import { BlogController } from "./hexagon/application/BlogController";
import { ForPosting } from "./hexagon/ports/driver/ForPosting";
import { BlogRepository } from "./hexagon/ports/driven/BlogRepository";

const repositoryAdapter: BlogRepository = new FileSystemBlogRepository();
const hexagon: ForPosting = new BlogController(repositoryAdapter);
const ui = new CLIBlog(hexagon);

ui.render();