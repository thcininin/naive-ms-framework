<script setup lang="ts">
import {RouterView} from 'vue-router'
import MessageApi from "@/components/MessageApi.vue";
import {ref} from "vue";
import type {GlobalTheme} from "naive-ui";
import { darkTheme } from 'naive-ui';

const theme = ref<GlobalTheme | null>(null);
</script>

<template>
  <n-config-provider :theme="theme" class="w-full h-full">
    <n-loading-bar-provider>
      <n-message-provider max="1">
        <RouterView/>
        <!--      引入到app中-->
        <message-api/>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
