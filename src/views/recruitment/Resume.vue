<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import PreviewList from "@/components/PreviewList.vue";
import {onMounted, ref} from "vue";
import ResumeDetails from "@/views/recruitment/components/ResumeDetails.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import {fetchResumeList} from "@/api/resumeApi";
import type {ResumeVo} from "@/interface/resume";
import type {ListOption} from "@/type/common";
import {generateResumeTags} from "@/utils/commonUtil";

const resumeList = ref<ResumeVo[]>([]);
const preList = ref<ListOption[]>([]);
const loading = ref(false);
const drawerRef = ref<InstanceType<typeof ResumeDetails>>();

function getResumeList() {
  fetchResumeList().then(res => {
    resumeList.value  = res.data;
    preList.value = res.data.map(item => {
      return {
        id: item.id,
        avatar: item.avatar,
        header: item.name,
        content: item.introduction,
        extraType: 'text',
        extraText: item.expectedSalaryRange,
        startTime: item.appliedAt,
        level: item.passed ? 'success' : 'warning',
        tags: generateResumeTags(item)
      }
    });
  })
}
onMounted(() => {
  getResumeList();
});
</script>

<template>
  <page-container>
    <resume-details ref="drawerRef" />

    <flex-grow-card>
      <n-tabs type="bar" animated>
        <n-tab name="all">
          全部
        </n-tab>
        <n-tab name="passed">
          已通过
        </n-tab>
        <n-tab name="rejected">
          已拒绝
        </n-tab>
      </n-tabs>
      <preview-list
          :data="preList"
          :raw-data="resumeList"
          show-level
          @click="(data: ResumeVo) => drawerRef?.open(data)"
      >
      </preview-list>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>