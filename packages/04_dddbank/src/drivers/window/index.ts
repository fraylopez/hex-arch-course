import { WindowCLIView } from "./WindowCLIView";
import { FileSystemAccountRepository } from "../../contexts/accounting/adapters/persistance/filesystem/FileSystemAccountRepository";
import { Bank } from "../../contexts/accounting/application/Bank";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { ForManagingAccounts } from "../../contexts/accounting/domain/ForManagingAccounts";

const repositoryAdapter: AccountRepository = new FileSystemAccountRepository();
const hexagon: ForManagingAccounts = new Bank(repositoryAdapter);
const ui = new WindowCLIView(hexagon);

ui.render();