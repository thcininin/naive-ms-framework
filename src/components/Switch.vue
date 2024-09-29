<script  lang="ts" setup="">
import {type Component, toRefs, useAttrs, watch} from "vue";
import {CircleCheck, Circle} from '@vicons/tabler';
import type {SwitchSize} from "@/type/common";
const props = withDefaults(defineProps<{
  checkedText?: string,
  uncheckedText?: string,
  checkedIcon?: Component,
  uncheckedIcon?: Component,
  size?: SwitchSize,
  square?: boolean,
}>(), {
  checkedText: '',
  uncheckedText: '',
  checkedIcon: CircleCheck,
  uncheckedIcon: Circle,
  square: false
})
const {
  checkedText,
  uncheckedText,
  checkedIcon,
  uncheckedIcon,
  size,
  square
} = toRefs(props);
const emits = defineEmits(['update:value']);
</script>

<template>
  <n-switch
      v-bind="$attrs"
      :size="size"
      :round="!square"
      @update:value="(value: any) => {
        emits('update:value', value);
      }"
  >
    <template #checked>
      {{ checkedText}}
    </template>
    <template #unchecked>
      {{ uncheckedText }}
    </template>
    <template #checked-icon>
      <n-icon size=20 :component="checkedIcon"></n-icon>
    </template>
    <template #unchecked-icon>
      <n-icon  :component="uncheckedIcon"></n-icon>
    </template>
  </n-switch>
</template>

<style scoped>

</style>