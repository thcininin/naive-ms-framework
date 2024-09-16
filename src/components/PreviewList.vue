<script  lang="ts" setup="">

import {type ListOption, ListOptionLevelClass} from "@/type/common";
import {Time} from '@vicons/carbon'
import {Separator} from '@vicons/tabler'
import Switch from "@/components/Switch.vue";

const props = withDefaults(defineProps<{
  data: ListOption[],
  loading?: boolean,
  skeletonCount: string | number,
  lineClamp?: string | number,
  showLevel?: boolean,
  rawData: any[]
}>(), {
  lineClamp: 2,
  showLevel: false,
  loading: false,
  skeletonCount: 3
})
const emits = defineEmits(['click', 'switch']);
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
        @click="() => emits('click', props.rawData[props.rawData.findIndex(r => r.id === item.id)])"
    >
      <template #prefix v-if="props.showLevel">
        <div
            class="w-1 h-14"
            :class="ListOptionLevelClass[<NonNullable<ListOption['level']>>item.level]"
        />
      </template>
      <n-thing content-indented>
        <template #avatar>
          <n-avatar
              v-if="item.avatar"
              size="large"
          />
        </template>
        <template #header>
          {{item.header}}
        </template>
        <template #header-extra>
          <n-gradient-text
              v-if="item.extraType === 'text' "
              type="info"
          >
            {{item.extraText}}
          </n-gradient-text>
          <Switch
              v-else-if="item.extraType === 'switch' && item.switchOption && item.switchOption.active !== undefined"
              v-model:value="item.switchOption.active"
              :checked-text="item.switchOption?.checkedText"
              :unchecked-text="item.switchOption?.uncheckedText"
              :loading="item.switchLoading"
              @click.stop
              @update:value="() => emits('switch', item)"
          />
        </template>
        <template #description>
          <n-flex v-if="item.tags && item.tags.length > 0">
            <n-tag v-for="tag in item.tags" size="small" type="info">
              {{tag}}
            </n-tag>
          </n-flex>
        </template>
        <template #default>
          <n-ellipsis
              v-html="item.content"
              :line-clamp="props.lineClamp ? props.lineClamp : 2"
              :tooltip="false"
          >
          </n-ellipsis>
        </template>
        <template #footer>
          <n-flex justify="start" align="center" size="large">
            <n-flex
                v-if="item.startTime"
                justify="start"
                align="center"
                size="small"
            >
              <n-icon :component="Time" />
              <span>{{item.startTime}}</span>
            </n-flex>
            <n-icon
                v-if="item.endTime"
                :component="Separator"
            />
            <n-flex
                v-if="item.endTime"
                justify="start"
                align="center"
                size="small"
            >
              <n-icon :component="Time"/>
              <span>{{item.endTime}}</span>
            </n-flex>
          </n-flex>
        </template>
      </n-thing>
    </n-list-item>
  </n-list>
</template>

<style scoped lang="postcss">

</style>