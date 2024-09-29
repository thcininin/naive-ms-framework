<script setup lang="ts">

import {NaiveUiTable, type TableColumns} from "naive-ui-table";
import {ref, toRefs, nextTick, onMounted, onBeforeUnmount, onUnmounted} from "vue";
import type {TableProps} from 'node_modules/naive-ui-table/dist/src/types/index.d.ts';
import { BasicForm, useForm } from 'naive-ui-form'


let resizeObserver: ResizeObserver;
const observeWidth = ref(0);
const props = defineProps<TableProps & {
  teleport?: string | HTMLElement,
  columns: TableColumns
}>();
const {
  columns,
  searchProps,
  requestApi,
  teleport,
} = toRefs(props);
const emits = defineEmits(['selected']);
const naiveUiTableRef = ref<InstanceType<typeof NaiveUiTable>>();
const selected = ref<Array<string | number>>();
defineExpose({clearSelected, naiveUiTableRef});

function handleCheck(keys: Array<string | number>) {
  nextTick(() => {
    selected.value = keys;
    emits('selected', selected.value);
  });
}

function clearSelected() {
  selected.value = [];
  emits('selected', selected.value);
  naiveUiTableRef.value?.refresh();
}

const observe = () => {
  // FIXME 这里只考虑了 teleport 是字符串，如果是 HTMLElement 类型，需要做相应的处理
  const el = document.getElementById((<string>teleport.value)?.slice(1)) as HTMLElement;
  if (el) {
    observeWidth.value = el.offsetWidth;

    resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        observeWidth.value = entry.contentRect.width;
      }
    });
    resizeObserver.observe(el);
  }
};
onMounted(() => {
  // console.log('table mounted')
  observe();
});
// onBeforeUnmount(() => {
//   console.log('table before unmount')
//   if (resizeObserver) {
//     resizeObserver.disconnect();
//   }
// });
// onUnmounted(() => {
//   console.log('table unmounted')
// })
</script>

<template>
  <naive-ui-table
      ref="naiveUiTableRef"
      :columns="columns"
      :search-props="searchProps"
      :request-api="requestApi"
      row-class-name="h-16"
      :resizeHeightOffset="100"
      @update:checked-row-keys="handleCheck"
  >
    <template v-for="(content, name) in $slots" v-slot:[name]>
      <slot :name="name"></slot>
    </template>
  </naive-ui-table>
  <teleport v-if="teleport" defer :to="teleport">
    <transition name="slide">
      <div
          v-if="selected && selected.length > 0"
          class="bg-gray-100 border-t border-gray-00 h-12 fixed bottom-0 overflow-hidden"
          :style="{'width': `${observeWidth}px`}"
      >
        <n-flex justify="space-between" align="center" class="w-full h-full px-4">
          <div class="text-sm text-gray-500 font-medium flex items-center">
            <div>
              当前选中: {{ selected.length }} 条数据
            </div>
          </div>
          <n-flex>
            <template #default>
              <slot name="batch-actions"></slot>
            </template>
          </n-flex>
        </n-flex>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="postcss">
:deep(.n-ellipsis) {
  @apply w-full
}

.slide-enter-active, .slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>