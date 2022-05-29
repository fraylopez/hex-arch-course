import { BankAdmin } from "../../contexts/administration/application/BankAdmin";
import { ForAccountAdministration } from "../../contexts/administration/domain/ForAccountAdministration";
import { AdminAccountRepository } from "../../contexts/administration/domain/AdminAccountRepository";
import { AdminCLIView } from "./AdminCLIView";
import { FileSystemAdminAccountRepository } from "../../contexts/administration/infrastructure/persistence/filesystem/FileSystemAccountRepository";

const repositoryAdapter: AdminAccountRepository = new FileSystemAdminAccountRepository();
const hexagon: ForAccountAdministration = new BankAdmin(repositoryAdapter);
const ui = new AdminCLIView(hexagon);

ui.render();