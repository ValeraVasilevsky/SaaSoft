<template>
  <ComboboxRoot v-bind="forwarded" :class="styles.combobox" multiple>
    <ComboboxAnchor :class="styles.anchor">
      <input v-model="searchValue" :class="styles.input" @blur="onValidate" />
    </ComboboxAnchor>

    <Typography
      v-if="error"
      variant="text-s-1"
      :name="props.rules ?? ''"
      :class="styles.error"
    >
      {{ errorMessage }}
    </Typography>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {
  ComboboxAnchor,
  ComboboxRoot,
  type ComboboxRootProps,
  type ComboboxRootEmits,
  useForwardPropsEmits,
} from "radix-vue";
import { Typography } from "../typography";
import { string } from "yup";

import styles from "./styles.module.css";
import { validate } from "vee-validate";

interface ComboboxProps extends ComboboxRootProps {
  rules?: "tags";
}

const emits = defineEmits<ComboboxRootEmits>();
const props = defineProps<ComboboxProps>();

const forwarded = useForwardPropsEmits(props, emits);
const searchValue = ref<string>(
  (props.modelValue as []).length
    ? (props.modelValue as { text: string }[])
        .map((item) => item.text)
        .join(";")
    : ""
);
const errorMessage = ref<string>("");
const error = ref<boolean>(false);

const validations = {
  tags: string().default("").max(50, "Максимальное количество символов - 50"),
};
const rules = computed(() => {
  if (props.rules) return validations[props.rules];
  return {};
});

const onValidate = async (): Promise<void> => {
  const { errors, valid } = await validate(searchValue.value, rules.value);
  error.value = !!errors.length;
  errorMessage.value = errors.length ? errors[0] : "";

  if (valid) {
    emits(
      "update:modelValue",
      searchValue.value.split(";").map((item) => ({ text: item }))
    );
  }
};

watch(searchValue, () => {
  if (!searchValue.value.includes(";")) return;
  if (searchValue.value[searchValue.value.length - 1] === ";") {
    onValidate();
  }
  if (searchValue.value.length === 0) {
    emits("update:modelValue", { text: "" });
  }
});
</script>
