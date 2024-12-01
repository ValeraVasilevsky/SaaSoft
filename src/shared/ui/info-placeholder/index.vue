<template>
  <article :class="[styles.container, styles[props.type]]">
    <component :class="styles.icon" :is="currentIcon" />

    <Typography variant="text-l-1" :class="styles.text">
      <slot />
    </Typography>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { Typography } from "../typography";
import InfoIcon from "../../icons/info.svg";
import ErrorIcon from "../../icons/error.svg";

import styles from "./styles.module.css";

type InfoPlaceholderType = "info" | "error";
interface InfoPlaceholderProps {
  type?: InfoPlaceholderType;
}

const props = withDefaults(defineProps<InfoPlaceholderProps>(), {
  type: "info",
});

const currentIcon = computed((): string => {
  switch (props.type) {
    case "error":
      return ErrorIcon;
    default:
      return InfoIcon;
  }
});
</script>
