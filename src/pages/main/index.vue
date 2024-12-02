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

      {{ displayedRecords }}
      <div
        v-for="(record, key) in displayedRecords"
        :key="record.id"
        :class="styles.row"
      >
        <Combobox
          v-model="records[key].tags"
          placeholder="XXX"
          :class="styles.tags"
        />

        <div :class="styles.type">
          <BaseSelect
            v-model="records[key].type"
            @update:model-value="onUpdateType(key as string)"
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
          v-model="records[key].login"
          placeholder="Введите логин"
          :class="[
            styles.login,
            { [styles.full]: records[key].type === 'ldap' },
          ]"
        />

        <BaseInput
          v-if="records[key].type === 'local'"
          v-model="records[key].password"
          placeholder="Введите пароль"
          type="password"
          :class="styles.password"
        />

        <BaseButton
          :border="false"
          :class="styles.btn"
          @click="onRemove(key as string)"
        >
          <template #left-icon>
            <RemoveIcon />
          </template>
        </BaseButton>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed } from "vue";
import {
  TABLE_COLUMNS,
  useRecordsStore,
  RecordTypes,
  Records,
} from "entities/records";
import {
  BaseButton,
  Typography,
  InfoPlaceholder,
  Combobox,
  BaseInput,
  BaseSelect,
  DropdownSelectItem,
} from "shared/ui";
import PlusIcon from "shared/icons/add.svg";
import RemoveIcon from "shared/icons/trash.svg";
import { useForm } from "shared/utils/useForm";

import styles from "./styles.module.css";

const { records } = storeToRefs(useRecordsStore());
const { addRecord, updatePassword, removeRecord } = useRecordsStore();
const { values, validateField } = useForm(RecordSchema);

const displayedRecords = computed((): Records => records.value);

const onUpdateType = (key: string): void => {
  updatePassword(key);
};
const onRemove = (key: string): void => {
  removeRecord(key);
};
</script>
