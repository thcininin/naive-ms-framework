<script setup lang="ts">

import {onMounted} from "vue";

const props = defineProps<{
  modelValue: string,
}>();
const emits = defineEmits(['update:value']);
onMounted(() => {
});
</script>

<template>
  <n-input
      :default-value="props.modelValue"
      v-bind="$attrs"
      type="textarea"
      placeholder="请输入"
      clearable
      rows="2"
      :resizable="false"
      @update:value="(value: any) => emits('update:value', value)"
  />
</template>

<style scoped>

</style>