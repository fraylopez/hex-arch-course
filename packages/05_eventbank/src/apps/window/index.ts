import { WindowCLIView } from "./WindowCLIView";
import { BankWindow } from "../../contexts/accounting/application/BankWindow";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { ForCreatingAccounts } from "../../contexts/accounting/domain/ForCreatingAccounts";
import { FileSystemAccountRepository } from "../../contexts/accounting/infrastructure/persistance/filesystem/FileSystemAccountRepository";
import { ForExistingAccountsOperation } from "../../contexts/accounting/domain/ForAccountsInteraction";

const repositoryAdapter: AccountRepository = new FileSystemAccountRepository();
const hexagon: ForCreatingAccounts & ForExistingAccountsOperation = new BankWindow(repositoryAdapter);
const ui = new WindowCLIView(hexagon);

ui.render();