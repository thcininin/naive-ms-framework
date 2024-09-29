<script setup lang="ts">

import DrawerContainer from "@/components/DrawerContainer.vue";
import {computed, ref} from "vue";
import type {ResumeVo} from "@/interface/resume";
import {GenderMale, GenderFemale} from '@vicons/carbon'
import {type Gender} from "@/interface/dict";
import {passResumes} from "@/api/resumeApi";
import naiveui from "@/utils/naiveui";

const show = ref(false);
const hasArgs = ref(false);
const details = ref<ResumeVo>();
const genderIcon = computed(() => <Gender>details.value?.gender === 'MALE' ? GenderMale : GenderFemale);
defineExpose({
  open: (data?: ResumeVo) => {
    console.log(data);
    hasArgs.value = !!data;
    show.value = true;
    details.value = data;
  },
  close: () => show.value = false
});
function handlePass() {
  passResumes([<string>details.value!.id]).then(res => {
    naiveui.message.success(res.msg);
  });
  show.value = false;
}
</script>

<template>
  <drawer-container
      v-model:show="show"
      v-if="details"
  >
    <template #header>
      <h1>
        {{details.name}}
        的简历
      </h1>
    </template>
    <div>
      <n-thing>
        <template #avatar>
          <n-image
              width="100"
              :src="details.avatar"
          />
        </template>
        <template #header>
          <n-flex align="center" justify="space-between">
            <h3 class="text-xl">
              {{details.name}}
            </h3>
            <n-icon :component="genderIcon "/>
          </n-flex>
        </template>
        <template #header-extra>
          {{details.expectedSalaryRange}}
        </template>
        <template #description>
          <n-flex>
          </n-flex>
        </template>
      </n-thing>
      <n-descriptions class="mt-2" :columns="3" label-placement="left">
        <n-descriptions-item label="毕业于">
          {{details.graduation}}
        </n-descriptions-item>
        <n-descriptions-item label="工作年限">
          {{details.experienceRange ? details.experienceRange : '无'}}
        </n-descriptions-item>
      </n-descriptions>
      <n-divider />
      <p v-html="details.introduction">
      </p>
    </div>
    <template #footer>
      <n-button type="success" @click="handlePass">
        通过
      </n-button>
    </template>
  </drawer-container>
</template>

<style scoped>

</style>