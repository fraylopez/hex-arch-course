import { ATMCLIView } from "./ATMCLIView";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { FileSystemAccountRepository } from "../../contexts/accounting/infrastructure/persistance/filesystem/FileSystemAccountRepository";
import { ForExistingAccountsOperation } from "../../contexts/accounting/domain/ForAccountsInteraction";
import { ATM } from "../../contexts/accounting/application/ATM";

const repositoryAdapter: AccountRepository = new FileSystemAccountRepository();
const hexagon: ForExistingAccountsOperation = new ATM(repositoryAdapter);
const ui = new ATMCLIView(hexagon);

ui.render();