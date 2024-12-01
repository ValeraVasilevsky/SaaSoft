<template>
  <div :class="styles.container">
    <div :class="styles.action">
      <Typography variant="text-xl-1" weight="600" :class="styles.title">
        Учетные записи
      </Typography>
      <BaseButton>
        <template #left-icon>
          <PlusIcon />
        </template>
      </BaseButton>
    </div>

    <InfoPlaceholder>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </InfoPlaceholder>
  </div>
</template>

<script setup lang="ts">
import { BaseButton, Typography, InfoPlaceholder } from "shared/ui";
import PlusIcon from "shared/icons/add.svg";

import styles from "./styles.module.css";
</script>
