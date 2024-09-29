<script setup lang="ts">

import {computed, reactive} from "vue";
import type {Pagination, TableColumn} from "@/type/common";

export type EditableTableProps<T> = {
  columns: TableColumn<T>[],
  data: T[],
  key: (key: keyof T) => string,
  pagination: Pagination,
  striped?: boolean
}
const props = defineProps<EditableTableProps<any>>();
const columns = computed(() => {
  if(props.columns) {
    return props.columns.map(column => {
      return {
       ...column,
        width: column.width || 100,
        render: column.r
      };
    })
  }
});
const pagination = reactive({...props.pagination});

function handlePageChange(page: number) {
  pagination.page = page;
  pagination.pageCallback?.(page);
}

</script>

<template>
  <n-data-table
      :columns="columns"
      :data="props.data"
      :key="props.key"
      :striped="props.striped"
      row-class-name="h-16"
      remote
      :pagination="pagination"
      @update:page="handlePageChange"
      flex-height
      class="min-h-full"
  >
  </n-data-table>
</template>

<style scoped>

</style>