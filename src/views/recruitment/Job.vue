<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import AddButton from "@/components/button/AddButton.vue";
import EditButton from "@/components/button/EditButton.vue";
import DelButton from "@/components/button/DelButton.vue";
import Switch from "@/components/Switch.vue";
import AddJob from "@/views/recruitment/components/JobModal.vue";
import {ref} from "vue";
import type {OperationType} from "@/type/common";


const show = ref(false);
const operationType = ref<OperationType>('add');

function handleEdit() {
  operationType.value = 'edit';
  show.value = true;
}
</script>

<template>
  <page-container>
    <add-job v-model:show="show" :operation-type="operationType"/>

    <flex-grow-card>
      <template #header>
        <add-button label="新增职位" @click="show = true"/>
      </template>
      <n-grid
          cols="xs:1 sm:2 m:4 xl:5"
          responsive="screen"
          x-gap="8"
          y-gap="8"
      >
        <n-gi v-for="i in 20" class="bg-green-50">
          <n-card>
            <template #header>
              job name
            </template>
            <template #header-extra>
              <Switch/>
            </template>
            job description
            <template #action>
              <n-flex justify="space-between" align="center">
                <edit-button
                    quaternary
                    @click="handleEdit"
                />
                <del-button
                    quaternary
                />
              </n-flex>
            </template>
            <template #footer>
              2022-01-01
            </template>
          </n-card>
        </n-gi>
      </n-grid>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>