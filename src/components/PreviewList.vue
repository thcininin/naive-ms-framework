<script  lang="ts" setup="">

import type {ListOption} from "@/type/common";

const props = defineProps<{
  data: ListOption[],
  loading: boolean,
  skeletonCount: string | number,
  lineClamp?: string | number,
  showLevel?: boolean
}>();
const emits = defineEmits(['click']);
</script>

<template>
  <n-list clickable hoverable class="p-2">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
    <n-flex vertical class="p-10" v-for="i in props.skeletonCount" :key="i" v-if="props.loading">
      <n-flex>
        <n-skeleton :width="40" :height="40"/>
        <n-flex vertical class="flex-grow">
          <n-skeleton text width="20%" />
          <n-skeleton text width="50%" />
        </n-flex>
      </n-flex>
      <n-skeleton text :repeat="2" />
      <n-skeleton text style="width: 60%" />
    </n-flex>
    <n-list-item
        v-else
        v-for="item in props.data"
        :key="item"
        class="flex items-center"
        @click="() => emits('click', item)"
    >
      <template #prefix v-if="props.showLevel">
        <div
            class="w-1 h-14"
            :class="item.level === 'info' ? 'bg-blue-500' : item.level === 'warning' ? 'bg-yellow-500' : 'bg-red-500' "
        />
      </template>
      <n-thing>
        <template #avatar>
          <n-avatar size="large">
          </n-avatar>
        </template>
        <template #header>
          {{item.header}}
        </template>
        <template #header-extra>
          header-extra
        </template>
        <template #description>
          <n-flex>
            <n-tag v-for="i in item.tags" size="small">
              tag{{i}}
            </n-tag>
          </n-flex>
        </template>
        <template #default>
          <n-ellipsis :line-clamp="props.lineClamp ? props.lineClamp : 2" :tooltip="false">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi et inventore libero sed. Alias aperiam architecto dolores, et explicabo illo ipsa nam neque odio sed unde vel veniam vero.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi et inventore libero sed. Alias aperiam architecto dolores, et explicabo illo ipsa nam neque odio sed unde vel veniam vero.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eligendi et inventore libero sed. Alias aperiam architecto dolores, et explicabo illo ipsa nam neque odio sed unde vel veniam vero.
            {{item.content}}
          </n-ellipsis>
        </template>
        <template #footer>
          2022-01-01
          {{item.time}}
        </template>
        <template #action>
          <slot name="action"></slot>
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<style scoped lang="postcss">

</style>