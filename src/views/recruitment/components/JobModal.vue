<script setup lang="ts">

import ModalContainer from "@/components/ModalContainer.vue";
import type {OperationType} from "@/type/common";
import CommonInput from "@/components/input/CommonInput.vue";
import SaveButton from "@/components/button/SaveButton.vue";
import TextareaInput from "@/components/input/TextareaInput.vue";
const props = defineProps<{
  operationType: OperationType
}>();
</script>

<template>
  <modal-container :title="props.operationType === 'add'? '新增职位' : '编辑职位'">
    <n-form label-placement="left">
      <n-form-item label="职位名称">
        <common-input />
      </n-form-item>
      <n-form-item label="职位描述">
        <textarea-input />
      </n-form-item>
    </n-form>
    <template #action>
      <save-button />
    </template>
  </modal-container>
</template>

<style scoped>

</style>