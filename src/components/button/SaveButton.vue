<script setup lang="ts">

import {type Component, toRefs} from "vue";
import{Save} from '@vicons/carbon'
import type {ButtonSize, ButtonType} from "@/type/common";

const props = defineProps<{
  icon?: Component,
  label?: string,
  type?: ButtonType,
  size?: ButtonSize,
  disabled?: boolean,
  loading?: boolean,
  secondary?: boolean,
  tertiary?: boolean,
  quaternary?: boolean,
  text?: boolean,
}>();
const {
  icon,
  label,
  type,
  size,
  disabled,
  loading,
  secondary,
  tertiary,
  quaternary,
  text,
} = toRefs(props);
const emits = defineEmits(['save', 'update']);
</script>

<template>
  <n-button
      :size="size"
      :type="type ? type : 'success' "
      :disabled="disabled"
      :loading="loading"
      :secondary="secondary"
      :tertiary="tertiary"
      :quaternary="quaternary"
      :text="text"
  >
    <template #icon>
      <n-icon :component="icon ? icon : Save "></n-icon>
    </template>
    {{label ? label : '保存'}}
  </n-button>
</template>

<style scoped>

</style>