<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import AddButton from "@/components/button/AddButton.vue";
import EditButton from "@/components/button/EditButton.vue";
import DelButton from "@/components/button/DelButton.vue";
import Switch from "@/components/Switch.vue";
import {ref} from "vue";
import {requestHandler} from "@/utils/requestHandler";
import JobModal from "@/views/recruitment/components/JobModal.vue";


const jobList = ref([]);
const jobModalRef = ref<InstanceType<typeof JobModal>>();
requestHandler("GET", "/job").then(res => {
  jobList.value = res.data;
});
</script>

<template>
  <page-container>
    <job-modal ref="jobModalRef"/>

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
        <n-gi v-for="i in jobList" class="bg-green-50">
          <n-card>
            <template #header>
              {{i.name}}
            </template>
            <template #header-extra>
              <Switch/>
            </template>
            {{i.description}}
            <template #action>
              <n-flex justify="space-between" align="center">
                <edit-button
                    quaternary
                    @click="jobModalRef?.open(i)"
                />
                <del-button
                    quaternary
                />
              </n-flex>
            </template>
            <template #footer>
              {{i.createdAt}}
            </template>
          </n-card>
        </n-gi>
      </n-grid>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>