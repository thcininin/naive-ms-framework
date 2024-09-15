<script  lang="ts" setup="">

import {onMounted, ref} from "vue";
import {generateMenuOptions} from "@/utils/routeUtil";
import {useRouter} from "vue-router";

// const router = useRouter();

// const menuOptions = ref<any[]>([]);
const props = defineProps<{
  collapsed: boolean
}>();
onMounted(() => {
  // menuOptions.value = generateMenuOptions(router.getRoutes().filter(r => r.path === '/')[0]?.children);
});
</script>

<template>
  <n-menu
      v-model:value="$route.name"
      :collapsed="props.collapsed"
      default-expand-all
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="generateMenuOptions($router.getRoutes().filter(r => r.path === '/')[0]?.children)"
  />
</template>

<style scoped>

</style>