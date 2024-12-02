import type { TableColumn } from "shared/ui";
import { BaseRecordType } from "./types";

export const TABLE_COLUMNS: TableColumn[] = [
  { title: "Метки", key: "tags" },
  { title: "Тип записи", key: "type" },
  { title: "Логин", key: "login" },
  { title: "Пароль", key: "password" },
  { title: "", key: "action" },
];

export const RecordTypes: { key: BaseRecordType; title: string }[] = [
  {
    title: "Локальный",
    key: "local",
  },
  {
    title: "LDAP",
    key: "ldap",
  },
];
