<script setup lang="ts">

import DrawerContainer from "@/components/DrawerContainer.vue";
import {computed, onMounted, ref, watch} from "vue";
import CommonInput from "@/components/input/CommonInput.vue";
import SaveButton from "@/components/button/SaveButton.vue";
import treeData from 'china-area-tree-data';
import {NaiveUiAiEditor} from 'naive-ui-ai-editor'
import 'naive-ui-ai-editor/dist/style.css'
import type {JobPostDto, JobPostVo} from "@/interface/jobPost";
import Switch from "@/components/Switch.vue";
import {generateEduLevelList} from "@/utils/commonUtil";
import {fetchJobList} from "@/api/jobApi";
import type {JobVo} from "@/interface/job";
import {createJobPost, updateJobPost} from "@/api/jobPostApi";
import naiveui from "@/utils/naiveui";

const provinceCityData = treeData
provinceCityData.forEach((data: any) => {
  if (data.children && data.children.length > 0) {
    data.children.forEach((child: any) => {
      delete child.children
    });
  }
});
const show = ref(false);
const hasArgs = ref(false);
const title = computed(() => hasArgs.value ? "编辑" : "发布招聘");
defineExpose({
  open: (data?: JobPostVo) => {
    getJobList();
    hasArgs.value = !!data;
    show.value = true;
    if(data) {
      formData.value = {
        ...data,
        jobId: <string>data.job?.id
      };
    }
  },
  close: () => show.value = false
});
const emits = defineEmits(['published', 'updated']);
const hideToolbarKeys = ['fullscreen', 'video', 'attachment'];
let formData = ref<JobPostDto & {id: string}>({
  id: '',
  jobId: undefined,
  title: '',
  location: undefined,
  salaryRange: '',
  experienceRange: '',
  educationLevel: undefined,
  requirements: '',
  description: '',
  internship: false,
  internshipDuration: '',
});
const jobList = ref<JobVo[]>([]);
function resetForm() {
  formData.value = {
    jobId: undefined,
    title: '',
    location: undefined,
    salaryRange: '',
    experienceRange: '',
    educationLevel: undefined,
    requirements: '',
    description: '',
    internship: false,
    internshipDuration: ''
  }
}
watch(show, n => {
  if(!n) {
    resetForm();
  }
});
function getJobList() {
  fetchJobList().then(res => jobList.value = res.data);
}
function handlePublish() {
  createJobPost(<JobPostDto>formData.value).then(res => {
    naiveui.message.success(res.msg);
    show.value = false;
  });
}
function handleUpdate() {
  console.log(formData.value);
  updateJobPost(formData.value.id, formData.value).then(res => {
    naiveui.message.success(res.msg);
    emits('updated', res.data);
    show.value = false;
  });
}
onMounted(() => {
});
</script>

<template>
  <drawer-container v-model:show="show">
    <template #header>
      <div>{{ title }}</div>
    </template>
    <n-form label-placement="left" label-width="70">
      <n-form-item label="职位">
        <n-select
            v-model:value="formData.jobId"
            :options="jobList.map(item => ({label: item.name, value: item.id}))"
            placeholder="请选择职位"
        />
      </n-form-item>
      <n-form-item label="标题">
        <common-input
            :model-value="formData.title"
            @update:value="(value) => formData.title = value"
        />
      </n-form-item>
      <n-form-item label="内容">
        <NaiveUiAiEditor
            v-model:value="formData.description"
            placeholder="请输入内容"
            request-func="() => Promise.resolve('')"
            :hide-toolbar-keys="hideToolbarKeys"
           />
      </n-form-item>
      <n-form-item label="工作地点">
        <n-cascader
            v-model:value="formData.location"
            placeholder="请选择"
            :options="provinceCityData"
            clearable
        />
      </n-form-item>
      <n-form-item label="薪资范围">
        <common-input
            :model-value="formData.salaryRange"
            @update:value="(value) => formData.salaryRange = value"
        />
      </n-form-item>
      <n-form-item label="经验要求">
        <common-input
            :model-value="formData.experienceRange"
            @update:value="(value) => formData.experienceRange = value"
        />
      </n-form-item>
      <n-form-item label="学历要求">
        <n-select
            placeholder="请选择"
            v-model:value="formData.educationLevel"
            :options="generateEduLevelList()"
        />
      </n-form-item>
      <n-form-item label="是否接受实习">
        <Switch
            v-model:value="formData.internship"
        />
      </n-form-item>
      <n-form-item label="实习时长">
        <common-input
            :model-value="formData.internshipDuration"
            @update:value="(value) => formData.internshipDuration = value"
        />
      </n-form-item>
    </n-form>
    <template #footer>
      <save-button
          :label="hasArgs ? '保存' : '发布'"
          @click="() => hasArgs ? handleUpdate() : handlePublish()"
      />
    </template>
  </drawer-container>
</template>

<style scoped>
:deep(.aie-container-main) {
  min-height: 200px !important;
}
</style>