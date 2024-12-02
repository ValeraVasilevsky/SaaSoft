import { defineStore } from "pinia";
import { ref } from "vue";
import { RecordsState, BaseRecord } from "./types";
// import { TableItem } from "shared/ui";

export const useRecordsStore = defineStore(
  "records",
  (): RecordsState => {
    const records = ref<BaseRecord[]>([]);
    const defaultRecord: BaseRecord = {
      id: String(Date.now()),
      tags: [{ text: "" }],
      type: "local",
      login: "",
      password: "",
    };

    const addRecord = (): void => {
      records.value.push(defaultRecord);
    };

    const updatePassword = (id: string): void => {
      const candidate = records.value.find((record) => record.id === id);
      const findedIndex = records.value.findIndex((record) => record.id === id);
      if (!candidate || findedIndex === -1) return;

      records.value.splice(findedIndex, 1, { ...candidate, password: null });
    };

    return {
      records,
      addRecord,
      updatePassword,
    };
  },
  {
    persist: {
      pick: ["records"],
    },
  }
);
