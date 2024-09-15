<script setup lang="ts">
import {ref, h, nextTick, onMounted} from 'vue';
import { NInput } from 'naive-ui';

const props = defineProps<{
  rawValue: any;
  callback: (value: any) => void;
}>();


const isEdit = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref(props.rawValue);

function handleOnClick() {
  console.log('handleOnClick');
  isEdit.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  });
}

function handleChange() {
  console.log("执行回调");
  props.callback(inputValue.value);
  isEdit.value = false;
}
function handleBlur() {
  isEdit.value = false;
}
onMounted(() => {
});
</script>
<template>
  <div @click="handleOnClick">
    <n-input
        v-if="isEdit"
        ref="inputRef"
        v-model:value="inputValue"
        @blur="handleBlur"
        @change="handleChange"
    />
    <span v-else>{{ props.rawValue }}</span>
  </div>
</template>
<style scoped>
</style>
