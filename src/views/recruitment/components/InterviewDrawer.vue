<script setup lang="ts">

import DrawerContainer from "@/components/DrawerContainer.vue";
import {computed, nextTick, onMounted, ref} from "vue";
import SaveButton from "@/components/button/SaveButton.vue";
import type {Interview, InterviewDto} from "@/interface/interview";
import {BasicForm, useForm} from 'naive-ui-form'
import {NaiveUiAiEditor} from "naive-ui-ai-editor";
import 'naive-ui-ai-editor/dist/style.css'
import {fetchCandidateLiteList} from "@/api/candidateApi";
import {createInterview} from "@/api/interviewApi";
import {meetingOptions, modeOptions} from "@/utils/commonUtil";
import naiveui from "@/utils/naiveui";


const show = ref(false);
const hasArgs = ref(false);
defineExpose({
  open: (data?: Interview) => {
    hasArgs.value = !!data;
    show.value = true;
    nextTick(() => {
      if(data && basicFormRef.value) {
        basicFormRef.value.setValue({
          title: data.title,
          mode: data.mode,
          location: data.location,
          meeting: data.meeting,
          meetingLink: data.meetingLink,
          interviewDate: data.interviewDate,
          interviewer: data.interviewer,
          candidateIds: data.interviewCandidates.map(item => item.candidate.id),
          remark: data.remark
        });
        // console.log(basicFormRef.value?.getValue());
      }
    });
  },
  close: () => show.value = false
});
const header = computed(() => hasArgs.value ? '编辑' : '创建面试');

const formData = ref<InterviewDto>({
  candidateIds: [],
  interviewDate: '',
  interviewer: '',
  location: '',
  meeting: undefined,
  meetingLink: '',
  mode: undefined,
  remark: '',
  title: ''
});

const candidateLiteList = ref<{label: string, value: any}[]>([]);
const [register] = useForm({
  showActionBtns: false,
  schemas: [
    {
      field: 'title',
      type: 'input',
      label: '面试标题',
      required: true,
      componentProps: {
        placeholder: '请输入面试标题',
        clearable: true
      }
    },
    {
      field: 'mode',
      type: 'select',
      label: '面试方式',
      required: true,
      defaultValue: undefined,
      componentProps: {
        placeholder: '请选择面试方式',
        options: modeOptions
      }
    },
    {
      field: 'location',
      type: 'input',
      label: '面试地点',
      required: true,
      vif(value) {
        return value.mode === 'OFFLINE';
      },
      componentProps: {
        placeholder: '请输入面试地点',
        clearable: true
      }
    },
    {
      field: 'meeting',
      type: 'radio',
      label: '视频会议',
      required: true,
      defaultValue: undefined,
      vif(value) {
        return value.mode === 'ONLINE';
      },
      componentProps: {
        options: meetingOptions,
      }
    },
    {
      field: 'meetingLink',
      type: 'input',
      label: '会议链接',
      required: true,
      vif(value) {
        return value.mode === 'ONLINE';
      },
      componentProps: {
        placeholder: '请输入会议链接',
        clearable: true
      }
    },
    {
      field: 'interviewDate',
      type: 'date-picker',
      label: '面试日期',
      required: true,
      componentProps: {
        placeholder: '请选择面试日期',
        clearable: true
      }
    },
    {
      field: 'interviewer',
      type: 'input',
      label: '面试官',
      required: false,
      componentProps: {
        placeholder: '请输入面试官',
        clearable: true
      }
    },
    {
      field: 'candidateIds',
      type:  'transfer',
      label: '候选人',
      required: false,
      componentProps: {
        placeholder: '请选择候选人',
        clearable: true,
        options: candidateLiteList
      }
    },
    {
      field:'remark',
      type: 'slot',
      slot: 'remark',
      label: '备注',
      required: false,
      componentProps: {
        placeholder: '请输入备注',
        clearable: true
      }
    }
  ]
});
const hideToolbarKeys = ['fullscreen', 'video', 'attachment'];
const basicFormRef = ref<InstanceType<typeof BasicForm>>();
function getCandidateLiteList() {
  fetchCandidateLiteList().then(res => {
    candidateLiteList.value = res.data.map(({id, name}) => ({
      label: name,
      value: id
    }));
  });
}
function handleCreateInterview() {
  const formValue = basicFormRef.value?.getValue;
  if (formValue) {
    createInterview(<InterviewDto>formValue()).then(res => {
      naiveui.message.success(res.msg);
    });
    show.value = false;
  }
}
function handleUpdateInterview() {
  console.log(basicFormRef.value?.getValue())
}
onMounted(() => {
  getCandidateLiteList();
});
</script>

<template>
  <drawer-container
      v-model:show="show"
  >
    <template #header>
      {{ header }}
    </template>
    <BasicForm
        @register="register"
        ref="basicFormRef"
    >
      <template #remark="{formValue, field}">
        <NaiveUiAiEditor
            v-model="formValue[field]"
            placeholder="请输入备注"
            request-func="() => Promise.resolve('')"
            :hide-toolbar-keys="hideToolbarKeys"
        />
      </template>
    </BasicForm>
    <template #footer>
      <save-button
          label="保存"
          @click="() => hasArgs ? handleUpdateInterview() : handleCreateInterview()"
      />
    </template>
  </drawer-container>
</template>

<style scoped>
:deep(.aie-container-main) {
  min-height: 200px !important;
}
</style>