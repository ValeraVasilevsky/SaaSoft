<template>
  <article :class="styles.root">
    <SelectRoot
      v-bind="forwarded"
      v-model:open="isOpen"
      @update:open="onValidate"
      required
    >
      <SelectTrigger :class="styles.trigger" :aria-label="placeholder">
        <Typography
          :class="[styles.label, { [styles.filled]: props.modelValue }]"
          variant="text-s-1"
        >
          <SelectValue :placeholder="placeholder" />
        </Typography>

        <ChevronDownIcon />
      </SelectTrigger>

      <SelectPortal :disabled="disablePortal">
        <DropdownSelectContent>
          <slot />
        </DropdownSelectContent>
      </SelectPortal>
    </SelectRoot>

    <Typography v-if="error" variant="text-s-1" :class="styles.error">
      {{ errorMessage }}
    </Typography>
  </article>
</template>

<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core";
import type { SelectRootProps, SelectRootEmits } from "radix-vue";
import {
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  useForwardPropsEmits,
} from "radix-vue";
import { ref } from "vue";
import { validate } from "vee-validate";

import { DropdownSelectContent } from "./content";
import { Typography } from "shared/ui";
import ChevronDownIcon from "shared/icons/chevron-down.svg";

import styles from "./styles.module.css";
import { string } from "yup";

export interface DropdownSelectProps extends SelectRootProps {
  /** By default, DropdownSelect renders inside the <body>, but this property can disable
   * the behaviour and render the DropdownSelect right where it is called. */
  disablePortal?: boolean;
  placeholder?: string;
}

const props = defineProps<DropdownSelectProps>();
const emits = defineEmits<SelectRootEmits>();

const errorMessage = ref<string>("");
const error = ref<boolean>(false);
const rules = ref(string().default("").required("Выберите данные"));
const isOpen = ref<boolean>(false);

const selectRootProps = reactiveOmit(props, "disablePortal", "placeholder");
const forwarded = useForwardPropsEmits(selectRootProps, emits);

const onValidate = async (): Promise<void> => {
  if (isOpen.value) return;
  console.log(forwarded.value);

  const { errors } = await validate(
    forwarded.value.modelValue,
    rules.value
  );
  error.value = !!errors.length;
  errorMessage.value = errors.length ? errors[0] : "";
};
</script>
