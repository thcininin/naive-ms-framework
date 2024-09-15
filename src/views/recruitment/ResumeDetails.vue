<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
</script>

<template>
  <page-container>
    page details
    {{ $route.params.id}}
  </page-container>
</template>

<style scoped>

</style>