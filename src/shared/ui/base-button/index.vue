<template>
  <button :type="props.type" :class="buttonClasses" @click="onClick">
    <slot v-if="slots['left-icon']" name="left-icon" :class="styles.icon" />

    <Typography v-if="slots['default']" variant="text-l-1" weight="500">
      <slot />
    </Typography>

    <slot v-if="slots['right-icon']" name="right-icon" :class="styles.icon" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Typography } from "../typography";

import styles from "./styles.module.css";

type BaseButtonEmits = {
  click: [value: void];
};
type BaseButtonType = "button" | "submit";
interface BaseButtonProps {
  type?: BaseButtonType;
  border?: boolean;
}

const slots = defineSlots<{
  default(props: object): never;
  "left-icon"(props: object): never;
  "right-icon"(props: object): never;
}>();
const emits = defineEmits<BaseButtonEmits>();
const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: "button",
  border: true,
});

const buttonClasses = computed((): string[] => {
  const classes: string[] = [styles.button];

  if (!slots.default) classes.push(styles.iconOnly);
  if (!props.border) classes.push(styles.noBorder);

  return classes;
});

const onClick = (): void => {
  emits("click");
};
</script>
