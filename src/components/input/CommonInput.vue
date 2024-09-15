<script setup lang="ts">

defineProps<{
  placeholder?: string
}>();
</script>

<template>
  <n-input
      :placeholder="placeholder ? placeholder : '请输入' "
      clearable
  />
</template>

<style scoped>

</style>