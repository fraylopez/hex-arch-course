import { CLIView } from "./hexagon/adapters/driver/CLIView";
import { FileSystemAccountRepository } from "./hexagon/adapters/driven/FileSystemAccountRepository";
import { Bank } from "./hexagon/application/Bank";
import { AccountRepository } from "./hexagon/ports/driven/AccountRepository";
import { ForManagingAccounts } from "./hexagon/ports/driver/ForManagingAccounts";
import { EURRatioService } from "./hexagon/application/EURRatioService";

const repositoryAdapter: AccountRepository = new FileSystemAccountRepository();
const ratioAdapter: EURRatioService = new EURRatioService();

const hexagon: ForManagingAccounts = new Bank(repositoryAdapter, ratioAdapter);
const ui = new CLIView(hexagon);

ui.render();