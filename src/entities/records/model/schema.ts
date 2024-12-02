import { object, string } from "yup";
import type { BaseRecordType } from "./types";

const DEFAULT_TYPE: BaseRecordType = "local";

export const RecordSchema = object({
  tags: string().default("").max(50, "Максимальное количество символов - 50"),
  type: string()
    .default(DEFAULT_TYPE)
    .min(1, "Минимальное количество символов - 1")
    .required("Введите данные"),
  login: string()
    .default("")
    .min(1, "Минимальное количество символов - 1")
    .max(100, "Максимальное количество символов - 100")
    .required("Введите данные"),
  password: string()
    .default("")
    .nullable()
    .max(100, "Максимальное количество символов - 100")
    .required("Введите данные"),
});
