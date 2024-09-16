<script setup lang="ts">

import ModalContainer from "@/components/ModalContainer.vue";
import CommonInput from "@/components/input/CommonInput.vue";
import SaveButton from "@/components/button/SaveButton.vue";
import TextareaInput from "@/components/input/TextareaInput.vue";
import {computed, reactive, ref} from "vue";

defineExpose({
  open: (data?: any) => {
    hasArgs.value = !!data;
    show.value = true;
    formData = {...data};
  },
  close: () => show.value = false
});
const show = ref(false);
const hasArgs = ref(false);
const title = computed(() => hasArgs.value? '编辑职位' : '新增职位');
let formData = reactive({
  name: '',
  description: ''
});
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
      <save-button @click="console.log(formData)"/>
    </template>
  </modal-container>
</template>

<style scoped>

</style>