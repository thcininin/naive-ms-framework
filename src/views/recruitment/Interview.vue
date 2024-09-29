<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import AddButton from "@/components/button/AddButton.vue";
import {onMounted, ref} from "vue";
import InterviewDrawer from "@/views/recruitment/components/InterviewDrawer.vue";
import PreviewList from "@/components/PreviewList.vue";
import {fetchInterviewList} from "@/api/interviewApi";
import type {InterviewVo} from "@/interface/interview";
import type {ListOption} from "@/type/common";
import {InterviewModeText, MeetingText} from "@/interface/dict";

const interviewDrawerRef = ref<InstanceType<typeof InterviewDrawer>>();
const interviewList = ref<InterviewVo[]>([]);
const preList = ref<ListOption[]>([]);

function getInterviewList() {
  fetchInterviewList().then(res => {
    interviewList.value = res.data;
    preList.value = res.data.map((item) => ({
      id: item.id,
      header: item.title,
      extraType: 'text',
      extraText: `面试人数：${item.interviewCandidates.length}`,
      tags: [InterviewModeText[item.mode], MeetingText[item.meeting]].filter(t => t),
      content: `备注: ${!!item.remark ? item.remark : '无'}`,
      startTime: item.interviewDate,
      link: item.meetingLink
    }));
  });
}

onMounted(() => {
  getInterviewList();
});
</script>

<template>
  <page-container>
    <interview-drawer ref="interviewDrawerRef"/>

    <flex-grow-card>
      <template #header>
        <add-button
            @click="interviewDrawerRef?.open()"
            label="创建面试"
        />
      </template>
      <preview-list
          :data="preList"
          :raw-data="interviewList"
          @click="(item) => interviewDrawerRef?.open(item)"
      />
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>