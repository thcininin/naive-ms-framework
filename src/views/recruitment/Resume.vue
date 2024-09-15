<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import PreviewList from "@/components/PreviewList.vue";
import {ref} from "vue";
import {requestHandler} from "@/utils/requestHandler";
import DrawerContainer from "@/components/DrawerContainer.vue";
import ResumeDetails from "@/views/recruitment/components/ResumeDetails.vue";

const resumeList = ref<any>([]);
const loading = ref(false);
requestHandler<any>("GET", "/resume").then(res =>{
  loading.value = true
  resumeList.value = res.data.map((item: any) => {
    return {
      header: item.name,
      extra: item.expectedSalaryRange,
      level: 'info'
    }
  })
  loading.value = false
});
const drawerRef = ref(false);
</script>

<template>
  <page-container>
<!--    show 透传到组件中-->
    <resume-details v-model:show="drawerRef">
    </resume-details>
    <preview-list
        :skeleton-count="3"
        :data="resumeList"
        :loading="loading"
        show-level
        @click="(args: any) =>{
          drawerRef = !drawerRef
        }"
    >
      <template #action>
        <n-button @click.stop>
          view
        </n-button>
      </template>
    </preview-list>
  </page-container>
</template>

<style scoped>

</style>