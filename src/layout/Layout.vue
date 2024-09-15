<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, onBeforeUnmount} from "vue";
import LayoutMenu from "@/layout/components/LayoutMenu.vue";
import type {DropdownOption} from "@/type/common";
import RouteTabs from "@/layout/components/RouteTabs.vue";

const route = useRoute();
const router = useRouter();
const collapsed = ref(false);
// 头像下拉菜单
const dropdownOptions: DropdownOption[] = [
  {
    label: '退出登录',
    key: 'logout',
    callback: () => console.log('logout callback')
  },
  {
    label: '个人中心',
    key: 'center',
    callback: () => console.log('center callback')
  },
]
const keydownHandler = (event: KeyboardEvent) => {
  if (event.altKey && event.key === '1') {
    collapsed.value = !collapsed.value;
  }
};

onMounted(() => {
  window.addEventListener('keydown', keydownHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', keydownHandler);
});
</script>

<template>
  <n-layout has-sider class="w-full h-full">
    <n-layout-sider
        collapse-mode="width"
        :collapsed="collapsed"
        :collapsed-width="64"
        :width="240"
        show-trigger="bar"
        bordered
        @updateCollapsed="collapsed = !collapsed"
    >
      <n-layout-header
          class="h-16 p-2 text-center text-lg "
      >
        <n-flex justify="center" align="center" :wrap="false">
          <n-icon :size="collapsed ? 30 : 40">
            <svg t="1726376328080" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="10424" width="32" height="32">
              <path
                  d="M468.086328 385.101612m-20.778037 88.034531a90.453333 90.453333 0 1 0 41.556074-176.069062 90.453333 90.453333 0 1 0-41.556074 176.069062Z"
                  fill="#30B280" p-id="10425"></path>
              <path
                  d="M375.911884 736.315362h33.762319a691.496812 691.496812 0 0 1 18.550725-37.101449h-52.313044a18.550725 18.550725 0 1 0 0 37.101449zM743.142029 289.762319v114.272464a682.666667 682.666667 0 0 1 63.888696-25.6V236.262029a61.95942 61.95942 0 0 0-61.885218-61.885217H348.753623a61.95942 61.95942 0 0 0-61.588406 56.023188h396.614493a59.362319 59.362319 0 0 1 59.362319 59.362319zM567.206957 521.126957a159.313623 159.313623 0 0 0-38.511305-20.925218l-60.623768 54.01971-60.549565-54.01971c-55.206957 20.776812-94.015072 69.157101-95.053913 125.625507v22.26087h146.328116a685.708986 685.708986 0 0 1 108.410435-126.961159zM381.922319 805.62087c3.858551-11.501449 8.088116-22.854493 12.54029-34.059131h-49.641739a18.550725 18.550725 0 0 0-13.133913 31.684638 62.849855 62.849855 0 0 0 16.844057 2.374493z"
                  fill="#30B280" p-id="10426"></path>
              <path
                  d="M361.887536 878.784928H242.717681a59.362319 59.362319 0 0 1-59.362319-59.362319V289.762319a59.362319 59.362319 0 0 1 59.362319-59.362319h4.823189A101.361159 101.361159 0 0 1 348.753623 134.975072h396.614493a101.435362 101.435362 0 0 1 101.286956 101.286957v130.077681A684.076522 684.076522 0 0 1 1016.57971 342.075362V140.985507a133.565217 133.565217 0 0 0-133.565217-133.565217H140.985507A133.565217 133.565217 0 0 0 7.42029 140.985507v742.028986a133.565217 133.565217 0 0 0 133.565217 133.565217h205.616232a679.253333 679.253333 0 0 1 15.285797-137.794782z"
                  fill="#30B280" p-id="10427"></path>
              <path
                  d="M1005.523478 822.613333l-31.462029-14.840579a188.475362 188.475362 0 0 0-0.593623-25.08058l29.68116-15.285797a16.324638 16.324638 0 0 0 7.420289-20.851015l-29.310145-68.266666a16.250435 16.250435 0 0 0-20.257391-8.904348l-32.946087 11.575652a173.931594 173.931594 0 0 0-18.17971-17.289275l10.314203-31.98145a16.176232 16.176232 0 0 0-9.423768-20.034782l-68.934493-27.529276a16.324638 16.324638 0 0 0-20.702609 8.013913l-14.840579 31.462029a188.772174 188.772174 0 0 0-25.08058 0.593624l-15.285797-29.68116a16.250435 16.250435 0 0 0-20.851015-7.42029l-68.192463 29.68116A16.250435 16.250435 0 0 0 667.826087 636.215652l11.575652 32.871884a182.01971 182.01971 0 0 0-17.289275 18.17971l-31.98145-10.314203a16.176232 16.176232 0 0 0-20.034782 9.423769l-27.529275 68.934492a16.324638 16.324638 0 0 0 8.088115 20.702609l31.462029 14.84058a166.585507 166.585507 0 0 0 0.593624 25.080579l-29.68116 15.285798a16.324638 16.324638 0 0 0-7.42029 20.851014l29.68116 68.266667a16.324638 16.324638 0 0 0 20.331594 8.904348L667.826087 917.889855a182.01971 182.01971 0 0 0 18.253913 17.066667l-10.314203 31.981449a16.250435 16.250435 0 0 0 9.423768 20.034783l68.934493 27.529275a16.324638 16.324638 0 0 0 20.702609-8.088116l14.840579-31.387826a177.048116 177.048116 0 0 0 25.08058-0.667826l15.285797 29.681159a16.324638 16.324638 0 0 0 20.851015 7.42029l68.266666-29.310145a16.324638 16.324638 0 0 0 8.904348-20.331594l-11.575652-32.871884a173.931594 173.931594 0 0 0 17.289275-18.17971l31.98145 10.314203a16.250435 16.250435 0 0 0 20.034782-9.423768l27.529276-68.934493a16.324638 16.324638 0 0 0-7.791305-20.108986z m-123.176811 107.148986l10.24 29.087536-40.292174 17.363478L838.492754 949.797101a16.102029 16.102029 0 0 0-17.066667-8.607536 144.769855 144.769855 0 0 1-39.624348 0.964638 16.250435 16.250435 0 0 0-16.473043 9.126956l-13.356522 27.826087-40.811594-16.250434 9.201159-28.493913a16.176232 16.176232 0 0 0-6.010435-18.179711 139.204638 139.204638 0 0 1-28.716521-27.306666 16.324638 16.324638 0 0 0-18.105508-5.194203l-29.087536 10.24-17.215072-40.588986 26.564637-13.57913a16.176232 16.176232 0 0 0 8.607537-17.14087 144.176232 144.176232 0 0 1-0.964638-39.550145 16.176232 16.176232 0 0 0-9.126957-16.473043l-27.826087-13.356522 16.324638-40.811594 28.41971 9.201159a16.324638 16.324638 0 0 0 18.17971-6.010434 139.204638 139.204638 0 0 1 27.306667-28.716522 16.324638 16.324638 0 0 0 5.194203-18.105507l-10.24-29.161739 40.366377-17.289276 13.57913 26.564638a16.176232 16.176232 0 0 0 17.14087 8.607536 140.985507 140.985507 0 0 1 39.550145-0.964638 16.398841 16.398841 0 0 0 16.769855-9.052753l13.356522-27.826087 40.737391 16.250435-9.572174 28.41971a16.398841 16.398841 0 0 0 6.010435 18.253913 140.985507 140.985507 0 0 1 28.716521 27.232464 16.250435 16.250435 0 0 0 18.105508 5.268405l29.310145-10.165797 17.289275 40.292174-26.564638 13.653333a16.102029 16.102029 0 0 0-8.607536 17.066667 141.875942 141.875942 0 0 1 0.964638 39.624348 16.250435 16.250435 0 0 0 9.126956 16.473043l27.826087 13.356522-16.250435 40.811594-28.41971-9.201159a16.398841 16.398841 0 0 0-18.253913 6.010435 140.985507 140.985507 0 0 1-27.232464 28.716521 16.398841 16.398841 0 0 0-5.268405 18.031305z"
                  fill="#30B280" p-id="10428"></path>
              <path
                  d="M769.187246 731.863188a73.386667 73.386667 0 1 0 96.463768 38.511305 73.535072 73.535072 0 0 0-96.463768-38.511305z m-8.607536 83.552464a40.885797 40.885797 0 1 1 53.722899 21.518841 40.885797 40.885797 0 0 1-53.722899-21.518841z"
                  fill="#30B280" p-id="10429"></path>
            </svg>
          </n-icon>
          <div v-if="!collapsed" class="font-bold text-gray-500">
            HRMS
          </div>
        </n-flex>
      </n-layout-header>
      <layout-menu :collapsed="collapsed"/>
    </n-layout-sider>
    <n-layout class="layout-right">
      <n-layout-header class="w-full h-16 flex items-center p-2">
        <n-flex justify="space-between" class="w-full">
          <n-breadcrumb>
            <n-breadcrumb-item
                v-for="crumb in $route.matched"
                :key="crumb.path"
                :clickable="false"
            >
              <router-link :to="{name: crumb.children.length > 0 ? null : crumb.name}">
                {{ crumb.meta.title }}
              </router-link>
            </n-breadcrumb-item>
          </n-breadcrumb>
          <n-flex>
            <n-dropdown
                ref="avatarDropdownRef"
                trigger="hover"
                placement="bottom-end"
                :options="dropdownOptions"
                @select="(key: string) => dropdownOptions.find(o => o.key === key)?.callback?.()"
            >
              <n-avatar
                  :style="{color: 'yellow',backgroundColor: 'red',}"
              >
                M
              </n-avatar>
            </n-dropdown>
          </n-flex>
        </n-flex>
      </n-layout-header>
      <n-layout
          class="router-content flex-grow bg-gray-100 "
          content-class="min-h-full flex flex-col overflow-hidden">
        <route-tabs/>
        <div class="flex-grow relative overflow-hidden">
          <router-view class="absolute inset-0 overflow-auto pb-4"/>
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="postcss">
.layout-right > :deep(.n-layout-scroll-container) {
  @apply flex flex-col
}

/* menu style
:deep(.n-menu-item-content--child-active .n-menu-item-content-header ),
:deep(.n-menu-item-content--child-active .n-menu-item-content__arrow) {
  @apply !text-blue-500 font-bold
}
:deep(.n-menu-item-content--selected)::before {
  @apply !bg-blue-100 text-blue-500
}
:deep(.n-menu-item-content--selected .n-menu-item-content-header) {
  @apply !text-blue-500
}

 */
</style>