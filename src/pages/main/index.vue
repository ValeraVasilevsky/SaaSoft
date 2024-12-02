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

    <article :class="styles.wrapper">
      <div :class="styles.header">
        <p v-for="column of TABLE_COLUMNS" :key="column.key" :class="styles.th">
          {{ column.title }}
        </p>
      </div>

      <div v-for="(record, i) of displayedRecords" :key="i" :class="styles.row">
        <Combobox
          v-model="records[i].tags"
          placeholder="XXX"
          :class="styles.tags"
        />

        <div :class="styles.type">
          <BaseSelect
            v-model="records[i].type"
            @update:model-value="onUpdateType(record)"
          >
            <DropdownSelectItem
              v-for="type of RecordTypes"
              :key="type.key"
              :value="type.key"
              :text-value="type.title"
            />
          </BaseSelect>
        </div>

        <BaseInput
          v-model="records[i].login"
          placeholder="Введите логин"
          :class="[styles.login, { [styles.full]: records[i].type === 'ldap' }]"
        />

        <BaseInput
          v-if="records[i].type === 'local'"
          v-model="records[i].password"
          placeholder="Введите пароль"
          type="password"
          :class="styles.password"
        />
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { TABLE_COLUMNS, useRecordsStore, RecordTypes } from "entities/records";
import {
  BaseButton,
  Typography,
  InfoPlaceholder,
  Combobox,
  TableItem,
  BaseInput,
  BaseSelect,
  DropdownSelectItem,
} from "shared/ui";
import PlusIcon from "shared/icons/add.svg";

import styles from "./styles.module.css";

const { records } = storeToRefs(useRecordsStore());
const { addRecord, updatePassword } = useRecordsStore();
// const { values, validateField } = useForm(RecordSchema);

const displayedRecords = computed((): TableItem[] =>
  records.value.map((record) => ({ ...record } as TableItem))
);

const onUpdateType = (record: TableItem): void => {
  updatePassword((record as { id: string }).id);
};
</script>
