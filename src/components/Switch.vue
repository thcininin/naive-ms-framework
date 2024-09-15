<script  lang="ts" setup="">
import {type Component, toRefs} from "vue";
import {CircleCheck, Circle} from '@vicons/tabler';
import type {SwitchSize} from "@/type/common";
const props = defineProps<{
  checkedText?: string,
  uncheckedText?: string,
  checkedIcon?: Component,
  uncheckedIcon?: Component,
  size?: SwitchSize,
  square?: boolean
}>();
const {
  checkedText,
  uncheckedText,
  checkedIcon,
  uncheckedIcon,
  size,
  square
} = toRefs(props);
</script>

<template>
  <n-switch :size="size" :round="!square">
    <template #checked>
      {{ checkedText ? checkedText : '' }}
    </template>
    <template #unchecked>
      {{ uncheckedText ? uncheckedText : '' }}
    </template>
    <template #checked-icon>
      <n-icon size=20 :component="checkedIcon ? checkedIcon : CircleCheck"></n-icon>
    </template>
    <template #unchecked-icon>
      <n-icon  :component="uncheckedIcon ? uncheckedIcon : Circle"></n-icon>
    </template>
  </n-switch>
</template>

<style scoped>

</style>