<script setup lang="ts">

import ModalContainer from "@/components/ModalContainer.vue";
import type {OperationType} from "@/type/common";
import CommonInput from "@/components/input/CommonInput.vue";
import SaveButton from "@/components/button/SaveButton.vue";
import TextareaInput from "@/components/input/TextareaInput.vue";
import {inject, reactive, ref, watch} from "vue";
const show = ref(false);
const hasArgs = ref(false);
defineExpose({
  open: (data?: any) => {
    hasArgs.value = !!data;
    show.value = true;
    formData = {...data};
  },
  close: () => show.value = false
});
let formData = reactive({
  name: '',
  description: ''
});
</script>

<template>
  <modal-container
      v-model:show="show"
      :title="hasArgs ? '编辑职位' : '新增职位'"
  >
    <n-form label-placement="left">
      <n-form-item label="职位名称">
        <common-input v-model:value="formData.name"/>
      </n-form-item>
      <n-form-item label="职位描述">
        <textarea-input v-model:value="formData.name"/>
      </n-form-item>
    </n-form>
    <template #action>
      <save-button />
    </template>
  </modal-container>
</template>

<style scoped>

</style>