<template>
  <div :class="styles.container">
    <div :class="styles.action">
      <Typography variant="text-xl-1" weight="600" :class="styles.title">
        Учетные записи
      </Typography>
      <BaseButton @click="addRecord">
        <template #left-icon>
          <PlusIcon />
        </template>
      </BaseButton>
    </div>

    <InfoPlaceholder>
      Для указания нескольких меток для одной пары логин/пароль используйте
      разделитель ;
    </InfoPlaceholder>

    <RecordsTable />
  </div>
</template>

<script setup lang="ts">
import { useRecordsStore, RecordsTable } from "entities/records";
import { BaseButton, Typography, InfoPlaceholder } from "shared/ui";
import PlusIcon from "shared/icons/add.svg";

import styles from "./styles.module.css";

const { addRecord } = useRecordsStore();
</script>
