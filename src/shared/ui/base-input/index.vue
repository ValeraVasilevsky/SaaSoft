<template>
  <article :class="inputClasses">
    <input
      v-model="inputValue"
      :type="inputType"
      @input="onInput"
      :placeholder="props.placeholder"
      :class="styles.input"
      :value="inputValue"
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

    <Typography v-if="props.error" variant="text-xs-1" :class="styles.error">
      {{ props.errorMessage }}
    </Typography>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Typography } from "../typography";
import { BaseButton } from "../base-button";

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
}

const slots = defineSlots<{
  "right-icon"(props: object): never;
}>();
const emits = defineEmits<BaseInputEmits>();
const props = withDefaults(defineProps<BaseInputProps>(), {
  error: false,
  errorMessage: "",
  type: "text",
});

const inputValue = ref<string | null>(props.modelValue);
const inputType = ref<BaseInputType>(props.type);

const inputClasses = computed((): string[] => {
  const classes: string[] = [styles.container];

  if (props.error) classes.push(styles.error);

  return classes;
});
const passwordIcon = computed((): string => {
  if (inputType.value !== "text") return EyeIcon;
  return EyeSlashIcon;
});

const hideText = (): void => {
  if (inputType.value === "text") inputType.value = "password";
  else inputType.value = "text";
};

const onInput = (): void => {
  emits("update:model-value", inputValue.value);
};
</script>
