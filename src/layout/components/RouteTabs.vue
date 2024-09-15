<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {computed, nextTick, ref, toRefs} from "vue";
import {tabHandler} from "@/utils/tabHandler";
import type {DropdownOption, Tab} from "@/type/common";
import ContextMenu from "@/components/ContextMenu.vue";

const route = useRoute();
const router = useRouter();

// 解构tabs的数组以及操作函数
const {tabs} = toRefs(tabHandler());
const {removeTab, removeOtherTab, removeAllTabs} = tabHandler();
// tabs对象
const tabList = computed<Tab[]>(() => tabs.value);
// 初始选中路由
const activeTabName = computed<string>(() => <string>route.name);
// 右键菜单位置
const xRef = ref(0);
const yRef = ref(0);
// 右键点击的tab name
const clickedTabName = ref<string | null>(null);
// 右键菜单ref
const contextMenuRef = ref<InstanceType<typeof ContextMenu>>();
// tabs右键菜单选项
const tabDropdownOptions: DropdownOption[] = [
  {
    label: '关闭全部',
    key: 'cl',
    callback: () => removeAllTabs()
  },
  {
    label: '关闭其他',
    key: 'co',
    callback: () => removeOtherTab(clickedTabName.value || activeTabName.value)
  },
  {
    label: '关闭当前',
    key: 'cc',
    callback: () => removeTab(activeTabName.value)
  },
];

function handleTabsContextMenu(e: MouseEvent) {
  e.preventDefault();
  findClickedTab(e);
  nextTick().then(() => {
    contextMenuRef.value?.show();
    xRef.value = e.clientX;
    yRef.value = e.clientY;
  });
}
function findClickedTab(e: MouseEvent) {
  const clickedElement = e.target as HTMLElement;
  const tabElement = <HTMLElement>clickedElement.parentElement;
  if (tabElement) {
    const attribute = tabElement.getAttribute('data-name');
    clickedTabName.value = attribute;
    return attribute || null;
  }
  return null;
}
</script>

<template>
  <n-scrollbar x-scrollable class="h-fit">
    <n-tabs
        v-model:value="activeTabName"
        type="card"
        closable
        animated
        @update:value="(name: string) => $router.push({name: name})"
        @close="(name: string) => removeTab(name)"
        @contextmenu="handleTabsContextMenu"
        tab-class="!bg-white"
        class="py-1 px-4"
    >
      <n-tab v-for="tab in tabList" :name="tab.name" :tab="tab.label"/>
    </n-tabs>
    <context-menu
        ref="contextMenuRef"
        v-if="tabDropdownOptions"
        :options="tabDropdownOptions"
        :x="xRef"
        :y="yRef"
    />
  </n-scrollbar>
</template>

<style scoped>

</style>