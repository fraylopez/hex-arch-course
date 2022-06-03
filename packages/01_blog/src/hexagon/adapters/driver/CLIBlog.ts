import * as readline from "readline-sync";
import { Post } from "../../application/Post";
import { ForPosting } from "../../ports/driver/ForPosting";
export class CLIBlog {

  private readonly options: Array<(onSuccess: () => void, onError: (err: Error) => void) => void>;
  constructor(private readonly blog: ForPosting) {
    this.options = [
      this.post.bind(this),
      this.read.bind(this),
    ];
  }
  render() {
    console.log("Welcome to the Blog!");
    console.log(`Choose an option:`);
    console.log(`${this.options.map((option, index) =>
      ` ${(index + 1)}) ${option.name.replace("bound ", "")}`).join("\n")}`);

    const option = Number(readline.question("Option:"));
    this.options[option - 1](this.render.bind(this), this.onError.bind(this));
  }
  private onError(_err: Error) {
    console.log("Something failed, try again...");
  }

  private post(onSuccess: () => void, onError: (err: Error) => void) {
    const author = readline.question("Name?");
    const content = readline.question("What are yout thinking?");
    this.blog.post(author, content)
      .then(() => {
        console.log("Your post was published!");
      })
      .catch(onError)
      .finally(onSuccess);
  }

  private read(onSuccess: () => void, onError: (err: Error) => void) {
    const author = readline.question("From whom?");
    this.blog.read(author)
      .then((posts: Post[]) => posts
        .map((post: Post) =>
          console.log(`
          ${post.author} said:
          ${post.date.toISOString()}
          ${post.content}
        `)
        ))
      .catch(onError)
      .finally(onSuccess);
  }
}