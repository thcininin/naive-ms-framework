<script setup lang="ts">

import {ref} from "vue";
import type DrawerContainer from "@/components/DrawerContainer.vue";

const show = ref(false);
const drawerRef = ref<InstanceType<typeof DrawerContainer>>();
const props = defineProps<{
  width?: string,
}>();
</script>

<template>
  <n-drawer
      ref="drawerRef"
      v-model:show="show"
      :width="props.width ? props.width : '40%'"
      class="drawer-container"
  >
    <n-drawer-content
        closable
        :native-scrollbar="false"
        header-class="w-full"
    >
      <template #header>
        <n-flex
            justify="space-between"
            align="center"
            class="w-full"
        >
          <slot name="header"></slot>
        </n-flex>
      </template>
      <template #default>
        <slot name="default"></slot>
      </template>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="postcss">
</style>