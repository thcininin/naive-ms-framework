<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import PreviewList from "@/components/PreviewList.vue";
import {ref} from "vue";
import {requestHandler} from "@/utils/requestHandler";
import DrawerContainer from "@/components/DrawerContainer.vue";
import ResumeDetails from "@/views/recruitment/components/ResumeDetails.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";

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
const drawerRef = ref<InstanceType<typeof ResumeDetails>>();
</script>

<template>
  <page-container>
<!--    show 透传到组件中-->
    <resume-details ref="drawerRef" />

    <flex-grow-card>
      <preview-list
          :skeleton-count="3"
          :data="resumeList"
          :loading="loading"
          show-level
          @click="(data: any) =>{
            drawerRef?.open(data)
        }"
      >
        <template #action>
          <n-button @click.stop>
            view
          </n-button>
        </template>
      </preview-list>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>