<script setup lang="ts">

import {computed, ref} from "vue";
import type {DropdownOption} from "@/type/common";

type OptionsKey = keyof typeof props.options[number]['key'];
const props = defineProps<{
  options: DropdownOption[],
  x: number,
  y: number
}>();
defineExpose({
  show: () => showDropdownRef.value = true,
  hide: () => showDropdownRef.value = false,
});
const showDropdownRef = ref(false);
const xRef = computed( () => props.x);
const yRef = computed(() => props.y);
</script>

<template>
  <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="xRef"
      :y="yRef"
      :options="props.options"
      :show="showDropdownRef"
      @clickoutside="() => showDropdownRef = false"
      @select="(key: OptionsKey) => props.options.find(o => o.key === key)?.callback?.()"
      @click="() => showDropdownRef = false"
  />
</template>

<style scoped>

</style>