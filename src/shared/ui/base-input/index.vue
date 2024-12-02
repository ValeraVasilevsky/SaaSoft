<template>
  <article :class="inputClasses">
    <input
      v-model="inputValue"
      :type="inputType"
      :placeholder="props.placeholder"
      :class="styles.input"
      :name="props.rules ?? ''"
      :rules="rules"
      @blur="onValidate"
    />

    <BaseButton
      v-if="props.type === 'password'"
      :border="false"
      :class="styles.button"
      @click="hideText"
    >
      <template #left-icon>
        <component :is="passwordIcon" :class="styles.icon" />
      </template>
    </BaseButton>

    <Typography
      v-if="error"
      variant="text-s-1"
      :name="props.rules ?? ''"
      :class="styles.error"
    >
      {{ errorMessage }}
    </Typography>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { string } from "yup";
import { validate } from "vee-validate";
import { BaseButton } from "../base-button";
import { Typography } from "../typography";

import EyeIcon from "./icons/eye.svg";
import EyeSlashIcon from "./icons/eye-slash.svg";

import styles from "./styles.module.css";

type BaseInputEmits = {
  "update:model-value": [value: string | null];
};
type BaseInputType = HTMLInputElement["type"];
interface BaseInputProps {
  modelValue: string | null;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  type?: BaseInputType;
  rules?: "login" | "password";
}

const slots = defineSlots<{
  "right-icon"(props: object): never;
}>();
const emits = defineEmits<BaseInputEmits>();
const props = withDefaults(defineProps<BaseInputProps>(), {
  type: "text",
});

const inputValue = ref<string | null>(props.modelValue);
const inputType = ref<BaseInputType>(props.type);
const errorMessage = ref<string>("");
const error = ref<boolean>(false);

const inputClasses = computed((): string[] => {
  const classes: string[] = [styles.container];

  if (props.error) classes.push(styles.error);

  return classes;
});
const passwordIcon = computed((): string => {
  if (inputType.value !== "text") return EyeIcon;
  return EyeSlashIcon;
});

const validations = {
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
};

const rules = computed(() => {
  if (props.rules) {
    return validations[props.rules];
  }
  return {};
});

const hideText = (): void => {
  if (inputType.value === "text") inputType.value = "password";
  else inputType.value = "text";
};
const onInput = (): void => {
  emits("update:model-value", inputValue.value);
};
const onValidate = async (): Promise<void> => {
  const { errors, valid } = await validate(inputValue.value, rules.value);
  error.value = !!errors.length;
  errorMessage.value = errors.length ? errors[0] : "";

  if (valid) {
    onInput();
  }
};
</script>
