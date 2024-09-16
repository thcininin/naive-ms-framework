<script setup lang="ts">

import {type Component, toRefs} from "vue";
import {Plus} from '@vicons/tabler'
import type {ButtonSize, ButtonType} from "@/type/common";

const props = withDefaults(defineProps<{
  icon?: Component,
  label?: string,
}>(), {
  icon: Plus,
  label: '添加'
})
const {
  icon,
  label,
} = toRefs(props);
</script>

<template>
  <n-button
      v-bind="$attrs"
      type="info"
  >
    <template #icon>
      <n-icon :component="icon"></n-icon>
    </template>
    {{ label }}
  </n-button>
</template>

<style scoped>

</style>