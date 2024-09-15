<script setup lang="ts">

import {ref} from "vue";

const show = ref(true);
</script>

<template>
  <n-layout-content
      :native-scrollbar="false"
      class="w-full h-full flex flex-col bg-transparent"
      content-class="flex-grow min-h-full flex flex-col px-4"
  >
    <n-alert
        v-if="show"
        :title="$route.meta.title"
        closable
        :show-icon="false"
        class="p-2 bg-white mb-2"
    />
    <slot></slot>
  </n-layout-content>
</template>

<style scoped>

</style>