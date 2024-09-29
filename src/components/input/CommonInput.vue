<script setup lang="ts">

const props = defineProps<{
  modelValue: {
    type: string,
    default: ''
  },
}>();
const emits = defineEmits(['update:value']);
</script>

<template>
  <n-input
      :default-value="props.modelValue"
      v-bind="$attrs"
      placeholder="请输入"
      clearable
      @update:value="(value: any) => emits('update:value', value)"
  />
</template>

<style scoped>

</style>