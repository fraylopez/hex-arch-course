import { ATMCLIView } from "./ATMCLIView";
import { FileSystemAccountRepository } from "../../contexts/accounting/infrastructure/persistance/filesystem/FileSystemAccountRepository";
import { Bank } from "../../contexts/accounting/application/Bank";
import { AccountRepository } from "../../contexts/accounting/domain/AccountRepository";
import { ForUsingAccounts } from "../../contexts/accounting/domain/ForUsingAccounts";

const repositoryAdapter: AccountRepository = new FileSystemAccountRepository();
const hexagon: ForUsingAccounts = new Bank(repositoryAdapter);
const ui = new ATMCLIView(hexagon);

ui.render();