import { defineStore } from "pinia";
import { ref } from "vue";
import { RecordsState, BaseRecord, Records } from "./types";

export const useRecordsStore = defineStore(
  "records",
  (): RecordsState => {
    const records = ref<Records>({});
    const defaultRecord: Omit<BaseRecord, "id"> = {
      tags: [{ text: "" }],
      type: "local",
      login: "",
      password: "",
    };

    const addRecord = (): void => {
      const key = String(Date.now());
      records.value[key] = { ...defaultRecord, id: Date.now() };
    };

    const updatePassword = (key: string): void => {
      records.value[key] = { ...records.value[key], password: null };
    };

    const removeRecord = (key: string): void => {
      delete records.value[key];
    };

    return {
      records,
      addRecord,
      updatePassword,
      removeRecord,
    };
  },
  {
    persist: {
      pick: ["records"],
    },
  }
);
