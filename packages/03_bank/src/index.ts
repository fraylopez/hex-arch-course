import { CLIView } from "./hexagon/adapters/primary/CLIView";
import { FileSystemAccountRepository } from "./hexagon/adapters/secondary/FileSystemAccountRepository";
import { Bank } from "./hexagon/application/Bank";
import { AccountRepository } from "./hexagon/domain/AccountRepository";
import { ForUsingAccounts } from "./hexagon/domain/ForUsingAccounts";

const repositoryAdapter: AccountRepository = new FileSystemAccountRepository();
const hexagon: ForUsingAccounts = new Bank(repositoryAdapter);
const ui = new CLIView(hexagon);

ui.render();