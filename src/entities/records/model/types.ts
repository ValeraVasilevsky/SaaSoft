import { Ref } from "vue";

export type BaseRecordType = "local" | "ldap";

export interface BaseRecord {
  id: number;
  tags: { text: string }[];
  type: BaseRecordType;
  login: string;
  password: string | null;
}
export type Records = { [key: string]: BaseRecord };
export interface RecordsState {
  records: Ref<Records>;
  addRecord: () => void;
  updatePassword: (key: string) => void;
  removeRecord: (key: string) => void;
}
