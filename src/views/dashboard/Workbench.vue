<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import {LogoGithub, LogoHtml5, LogoVue, LogoAngular, LogoReact, LogoNodejs} from '@vicons/ionicons5';
import {computed, inject, ref} from "vue";
import { addDays, isYesterday } from 'date-fns'
import type {StaffVoLite} from "@/interface/staff";
import {checkIn, fetchMyTodayCheck} from "@/api/checkApi";
import naiveui from "@/utils/naiveui";
import {applyOvertime} from "@/api/overtimeApi";
import {useDialog} from "naive-ui";
import {type FormSchema, ModalForm, type Recordable} from "naive-ui-form";
import {NaiveUiAiEditor} from "naive-ui-ai-editor";
import 'naive-ui-ai-editor/dist/style.css';
import {LeaveTypeOptions} from "@/utils/commonUtil";
import type {LeaveDto} from "@/interface/leave";
import {applyLeave} from "@/api/leaveApi";

const dialog = useDialog();
const projects: {icon: any, header: string, description: string, author: string, date: string}[] = [
  {
    icon: LogoGithub,
    header: 'Github',
    description: '是一个面向开源及私有软件项目的托管平台。',
    author: '开源君',
    date: '2021-07-04'
  },
  {
    icon: LogoVue,
    header: 'Vue',
    description: '渐进式 JavaScript 框架。',
    author: '学不动也要学',
    date: '2021-07-04'
  },
  {
    icon: LogoHtml5,
    header: 'Html5',
    description: 'HTML5是互联网的下一代标准。',
    author: '撸码也是一种艺术',
    date: ' 2021-04-01'
  },
  {
    icon: LogoAngular,
    header: 'Angular',
    description: '现代 Web 开发平台，百万粉丝热捧。',
    author: '铁粉君',
    date: '2021-07-04'
  },
  {
    icon: LogoReact,
    header: 'React',
    description: '用于构建用户界面的 JavaScript 库。',
    author: '技术牛',
    date: '2021-07-04'
  },
  {
    icon: LogoNodejs,
    header: 'Js',
    description: '路是走出来的，而不是空想出来的。',
    author: '架构组',
    date: '2021-07-04'
  },
]
const operations: {icon: string, color: string, label: string, callback?: () => void}[] = [
  {
    icon: 'icon-bukashenqing',
    color: 'text-green-500',
    label: '打卡',
    callback: () => handleCheckIn()
  },
  {
    icon: 'icon-jiabanshenqing',
    color: 'text-blue-500',
    label: '加班',
    callback: () => handleOvertime()
  },
  {
    icon: 'icon-qingjiashenqing\n',
    color: 'text-yellow-500',
    label: '请假',
    callback: () => showModal.value = true
  },
]
const value = ref(addDays(Date.now(), 1).valueOf());
function isDateDisabled(timestamp: number) {
  return isYesterday(timestamp);
}
const staffInfo = inject<StaffVoLite | undefined>('staffInfo');
async function getSelfTodayCheck() {
  const res = await fetchMyTodayCheck();
}
async function handleCheckIn() {
  await checkIn();
}
function handleOvertime() {
  dialog.info({
    title: '确认',
    content: `是否确认于今日加班`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      handleApplyOvertime();
    }
  });
}
function handleApplyOvertime() {
  applyOvertime().then(res => {
    naiveui.message.success(res.msg);
  });
}
const modalFormRef = ref<InstanceType<typeof ModalForm>>();
const showModal = ref(false);
const reason = ref('');
const schemas: FormSchema[] = [
  {
    field: 'type',
    label: '请假类型',
    type: 'select',
    required: true,
    defaultValue: 'SICK_LEAVE',
    componentProps: {
      placeholder: '请选择请假类型',
      options: LeaveTypeOptions,
      clearable: true
    }
  },
  {
    field: 'reason',
    type: "slot",
    slot: 'reason',
    label: '请假事由',
    componentProps: {
      placeholder: '请输入请假事由',
      clearable: true
    }
  },
  {
    field: 'duration',
    label: '时间',
    type: 'date-picker',
    required: true,
    requiredType: 'array',
    componentProps: {
      type: 'daterange',
      rangeSeparator: '至',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      clearable: true
    }
  }
]
const loading = ref(false);
function handleSubmit(values: Recordable) {
  modalFormRef.value?.setValue({...values, reason: reason.value});
  const data: LeaveDto & { duration?: [any, any] } = {
    ...values,
    start: values['duration'][0],
    end: values['duration'][1]
  } as LeaveDto & { duration?: [any, any] };
  delete data['duration']
  loading.value = true;
  handleApplyLeave(data);
}
function handleApplyLeave(data: LeaveDto) {
  applyLeave(data).then(res => {
    naiveui.message.success(res.msg);
    loading.value = false;
    showModal.value = false;
  });
}
</script>

<template>
  <page-container>
    <modal-form
        ref="modalFormRef"
        v-model:show="showModal"
        :schemas="schemas"
        title="请假"
        :loading="loading"
        :show-icon="false"
        style="width: 800px"
        @submit="handleSubmit"
    >
      <template #reason="{formValue, field}">
        <NaiveUiAiEditor
            v-model:value="reason"
            placeholder="请输入请假事由"
            request-func="() => Promise.resolve('')"
        />
      </template>
    </modal-form>

      <n-card>
        <n-grid cols="2">
          <n-gi>
            <n-flex
                align="center"
                class="w-full"
            >
              <n-avatar round :size="58" :src="staffInfo?.avatar"/>
              <n-flex vertical size="small">
                <h3 class="text-xl">晚上好, {{staffInfo?.name}}, 开始您一天的工作吧！</h3>
                <p class="text-sm text-gray-500">今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
              </n-flex>
            </n-flex>
          </n-gi>
          <n-gi>
            <n-flex justify="space-evenly" align="center">
              <n-statistic label="项目数" :value="16">
              </n-statistic>
              <n-statistic label="待办" value="3">
                <template #suffix>
                  / 15
                </template>
              </n-statistic>
              <n-statistic label="消息" value="35">
              </n-statistic>
            </n-flex>
          </n-gi>
        </n-grid>
      </n-card>
      <n-grid cols="2" x-gap="8" class="mt-2">
        <n-gi>
          <n-card >
            <template #header>
              项目
            </template>
            <n-grid cols="3">
              <n-gi
                  v-for="project in projects"
                  :key="project"
              >
                <n-card
                    class="h-52 flex-1"
                    hoverable
                    :bordered="false"
                >
                  <template #header>
                    <n-flex>
                      <n-icon :component="project.icon" size="30"/>
                      <div>
                        {{project.header}}
                      </div>
                    </n-flex>
                  </template>
                  <p>{{project.description}}</p>
                  <template #footer>
                    <div>
                      {{ project.author }}
                    </div>
                    <div>
                      {{project.date}}
                    </div>
                  </template>
                </n-card>
              </n-gi>
            </n-grid>
          </n-card>
        </n-gi>
        <n-gi>
          <n-card>
            <template #header>
              快捷操作
            </template>
            <n-grid cols="3">
              <n-gi
                  v-for="operation in operations"
                  :key="operation"
              >
                <n-card
                    :bordered="false"
                    hoverable
                    class="cursor-pointer"
                    @click="operation?.callback"
                >
                  <n-flex vertical justify="center" align="center">
                    <div
                        class="iconfont text-4xl"
                        :class="[operation.icon, operation.color]"
                    />
                    <div class="font-bold text-gray-500">
                      {{operation.label}}
                    </div>
                  </n-flex>
                </n-card>
              </n-gi>
            </n-grid>
          </n-card>
          <n-card class="mt-2">
            <n-calendar
                v-model:value="value"
                #="{ year, month, date }"
                :is-date-disabled="isDateDisabled"
                class="w-full h-96"
            >
              {{ year }}-{{ month }}-{{ date }}
            </n-calendar>
          </n-card>
        </n-gi>
      </n-grid>
  </page-container>
</template>

<style scoped>
:deep(.aie-container-main) {
  min-height: 200px !important;
}
</style>