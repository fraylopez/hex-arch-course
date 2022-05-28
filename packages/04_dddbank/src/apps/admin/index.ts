import { BankAdmin } from "../../contexts/admin/application/BankAdmin";
import { ForAccountAdministration } from "../../contexts/admin/domain/ForAccountAdministration";
import { AdminAccountRepository } from "../../contexts/admin/domain/AdminAccountRepository";
import { AdminCLIView } from "./AdminCLIView";
import { FileSystemAdminAccountRepository } from "../../contexts/admin/infrastructure/persistence/filesystem/FileSystemAccountRepository";

const repositoryAdapter: AdminAccountRepository = new FileSystemAdminAccountRepository();
const hexagon: ForAccountAdministration = new BankAdmin(repositoryAdapter);
const ui = new AdminCLIView(hexagon);

ui.render();