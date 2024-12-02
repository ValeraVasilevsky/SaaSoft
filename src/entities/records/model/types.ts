import { Ref } from "vue";

export type BaseRecordType = "local" | "ldap";

export interface BaseRecord {
  id: string;
  tags: { text: string }[];
  type: BaseRecordType;
  login: string;
  password: string | null;
}
export interface RecordsState {
  records: Ref<BaseRecord[]>;
  addRecord: () => void;
  updatePassword: (id: string) => void;
}
