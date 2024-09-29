<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import AddButton from "@/components/button/AddButton.vue";
import EditButton from "@/components/button/EditButton.vue";
import DelButton from "@/components/button/DelButton.vue";
import {onMounted, ref} from "vue";
import JobModal from "@/views/recruitment/components/JobModal.vue";
import {fetchJobList} from "@/api/jobApi";
import type {JobVo} from "@/interface/job";

const jobList = ref<JobVo[]>([]);
const jobModalRef = ref<InstanceType<typeof JobModal>>();
function getJobList() {
  fetchJobList().then(res => jobList.value = res.data);
}
function refresh(newData: JobVo) {
  const index = jobList.value.findIndex(job => job.id === newData.id);
  if (index === -1) {
    jobList.value.unshift(newData);
  } else {
    Object.assign(jobList.value[index], newData);
  }
}
onMounted(() => {
  getJobList();
});
</script>

<template>
  <page-container>
    <job-modal ref="jobModalRef"
               @updated="refresh"
               @saved="refresh"
    />

    <flex-grow-card>
      <template #header>
        <add-button label="新增职位" @click="jobModalRef?.open()"/>
      </template>
      <n-grid
          cols="xs:1 sm:2 m:4 xl:5"
          responsive="screen"
          x-gap="8"
          y-gap="8"
      >
        <n-gi v-for="job in jobList">
          <n-card class="w-full h-full">
            <template #header>
              {{job.name}}
            </template>
            {{job.description}}
            <template #action>
              <n-flex justify="space-between" align="center">
                <edit-button
                    quaternary
                    @click="jobModalRef?.open(job)"
                />
                <del-button
                    quaternary
                />
              </n-flex>
            </template>
            <template #footer>
              {{job.createdAt}}
            </template>
          </n-card>
        </n-gi>
      </n-grid>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>