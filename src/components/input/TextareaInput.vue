<script setup lang="ts">

defineProps<{
  placeholder?: string,
  rows?: string | number
}>();
</script>

<template>
  <n-input
      type="textarea"
      :placeholder="placeholder ? placeholder : '请输入' "
      clearable
      :rows="rows ? rows : '2' "
      :resizable="false"
  />
</template>

<style scoped>

</style>