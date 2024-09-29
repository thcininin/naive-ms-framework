<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import AddButton from "@/components/button/AddButton.vue";
import PreviewList from "@/components/PreviewList.vue";
import {onMounted, provide, ref} from "vue";
import type {JobPostVo} from "@/interface/jobPost";
import {fetchJobPostList, toggleActive} from "@/api/jobPostApi";
import type {ListOption} from "@/type/common";
import {generateJobPostTags} from "@/utils/commonUtil";
import naiveui from "@/utils/naiveui";
import JobPostDetails from "@/views/recruitment/components/JobPostDetails.vue";
import treeData from 'china-area-tree-data';
const provinceCityData = treeData
provinceCityData.forEach((data: any) => {
  if (data.children && data.children.length > 0) {
    data.children.forEach((child: any) => {
      delete child.children
    });
  }
});
provide('provinceCityData', provinceCityData);
const jobPostList = ref<JobPostVo[]>([]);
const preList = ref<ListOption[]>([]);
const switchLoading = ref(false);
const jobPostDetailsRef = ref<InstanceType<typeof JobPostDetails>>();
function getJobPostList() {
  fetchJobPostList().then(res => {
    jobPostList.value = res.data
    preList.value = res.data.map(item => {
      return {
        id: item.id,
        header: item.title,
        switchOption: {checkedText: '招聘中', uncheckedText: '已下架', active: item.active},
        switchLoading: switchLoading,
        extraType: 'switch',
        content: item.description,
        startTime: item.postDate,
        level: item.active ? 'success' : 'default',
        tags: generateJobPostTags(item)
      }
    });
  });
}
function handleToggleActive(id: string) {
  toggleActive(id).then(res => {
    switchLoading.value = true;
    naiveui.message.success(res.msg);
    switchLoading.value = false;
    const index = preList.value.findIndex(item => item.id === id);
    preList.value[index].switchOption!.active = res.data;
  });
}
function refresh(newData: JobPostVo) {
  console.log('refresh')
  const index = jobPostList.value.findIndex(post => post.id === newData.id);
  if (index === -1) {
    jobPostList.value.unshift(newData);
  } else {
    Object.assign(jobPostList.value[index], newData);
  }
}
onMounted(() => {
  getJobPostList();
});
</script>

<template>
  <page-container>
    <job-post-details
        ref="jobPostDetailsRef"
        @updated="refresh"
    />

    <flex-grow-card>
      <template #header>
        <add-button label="发布招聘" @click="() => jobPostDetailsRef?.open()"/>
      </template>
      <preview-list
          :raw-data="jobPostList"
          :data="preList"
          skeleton-count="3"
          show-level
          @click="(value: any) => jobPostDetailsRef?.open(value)"
          @switch="(v: JobPostVo) => handleToggleActive(<string>v.id) "
      >
      </preview-list>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>