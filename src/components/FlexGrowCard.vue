<script setup lang="ts">

import { useSlots } from 'vue';

// const slots = useSlots();
// console.log(slots);
</script>

<template>
  <n-card class="flex-grow" content-class="w-full h-full">
    <template v-for="(content, name) in $slots" v-slot:[name]>
      <slot :name="name"></slot>
    </template>
  </n-card>
</template>

<style scoped>

</style>