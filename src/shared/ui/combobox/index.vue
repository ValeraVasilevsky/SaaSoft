<template>
  <ComboboxRoot v-bind="forwarded" :class="styles.combobox" multiple>
    <ComboboxAnchor :class="styles.anchor">
      <input v-model="searchValue" :class="styles.input" />
    </ComboboxAnchor>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  ComboboxAnchor,
  ComboboxRoot,
  type ComboboxRootProps,
  type ComboboxRootEmits,
  useForwardPropsEmits,
} from "radix-vue";

import styles from "./styles.module.css";

const emits = defineEmits<ComboboxRootEmits>();
const props = defineProps<ComboboxRootProps>();

const forwarded = useForwardPropsEmits(props, emits);
const searchValue = ref<string>(
  (props.modelValue as []).length
    ? (props.modelValue as { text: string }[])
        .map((item) => item.text)
        .join(";")
    : ""
);

watch(searchValue, () => {
  if (searchValue.value[searchValue.value.length - 1] === ";") {
    emits(
      "update:modelValue",
      searchValue.value.split(";").map((item) => ({ text: item }))
    );
  }
  if (searchValue.value.length === 0) {
    emits("update:modelValue", { text: "" });
  }
});
</script>
