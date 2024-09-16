<script setup lang="ts">

import ModalContainer from "@/components/ModalContainer.vue";
import CommonInput from "@/components/input/CommonInput.vue";
import SaveButton from "@/components/button/SaveButton.vue";
import TextareaInput from "@/components/input/TextareaInput.vue";
import {computed, reactive, ref} from "vue";
import {createJob, updateJob} from "@/api/jobApi";
import naiveui from "@/utils/naiveui";
import type {JobVo} from "@/interface/job";

defineExpose({
  open: (data?: JobVo) => {
    hasArgs.value = !!data;
    show.value = true;
    rawData.value = {...data};
    formData = {name: <string>data?.name, description: <string>data?.description};
  },
  close: () => show.value = false
});
const emits = defineEmits(['updated', 'saved']);
const rawData = ref<JobVo>();
const show = ref(false);
const hasArgs = ref(false);
const title = computed(() => hasArgs.value? '编辑职位' : '新增职位');
let formData = reactive({
  name: '',
  description: ''
});
function handleCreateJob() {
  createJob(formData).then(res => {
    naiveui.message.success(res.msg);
    emits('saved', res.data);
    show.value = false;
  });
}
function handleUpdateJob() {
  if(rawData.value) {
    updateJob(<string>rawData.value.id, formData).then(res => {
      naiveui.message.success(res.msg);
      emits('updated', res.data);
      show.value = false;
    });

  }
}
</script>

<template>
  <modal-container
      v-model:show="show"
      :title="title"
  >
    <n-form label-placement="left">
      <n-form-item label="职位名称">
        <common-input
            :model-value="formData.name"
            @update:value="(value: any) => formData.name = value"
        />
      </n-form-item>
      <n-form-item label="职位描述">
        <textarea-input
            :model-value="formData.description"
            @update:value="(value: any) => formData.description = value"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <save-button
         @click="() => hasArgs ? handleUpdateJob() : handleCreateJob()"
      />
    </template>
  </modal-container>
</template>

<style scoped>

</style>