<script setup lang="ts">

import {ref} from "vue";

const show = ref(false);
const props = defineProps<{
  title?: string;
}>();
</script>

<template>
  <n-modal
      v-model:show="show"
      preset="dialog"
      :title="title ? props.title : '标题'"
      :show-icon="false"
  >
    <template #default>
      <slot></slot>
    </template>
    <template #action>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>

<style scoped>

</style>