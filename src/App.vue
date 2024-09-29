<script setup lang="ts">
import {RouterView} from 'vue-router'
import MessageApi from "@/components/MessageApi.vue";
import {ref} from "vue";
import {dateZhCN, type GlobalTheme, type NDateLocale, type NLocale, zhCN} from "naive-ui";
import {darkTheme} from 'naive-ui';

const theme = ref<GlobalTheme | null>(null);
const locale = ref<NLocale | null>(zhCN);
const dateLocale = ref<NDateLocale | null>(dateZhCN);
</script>

<template>
  <n-config-provider
      :locale="locale"
      :date-locale="dateLocale"
      :theme="theme"
      class="w-full h-full"
  >
    <n-loading-bar-provider>
      <n-message-provider :max="1">
        <n-dialog-provider>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
          <!--      引入到app中-->
          <message-api/>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
