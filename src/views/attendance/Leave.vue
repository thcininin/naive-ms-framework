<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import {addDays, isYesterday} from 'date-fns/esm';
import {computed, h, nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import ContextMenu from "@/components/ContextMenu.vue";
import type {DropdownOption, ListOption} from "@/type/common";
import PreviewList from "@/components/PreviewList.vue";
import {ModalForm, type FormSchema, type Recordable} from 'naive-ui-form';
import {NaiveUiAiEditor} from "naive-ui-ai-editor";
import 'naive-ui-ai-editor/dist/style.css';
import {LeaveTypeOptions} from "@/utils/commonUtil";
import type {Leave, LeaveDto, LeaveType, LeaveVo} from "@/interface/leave";
import {applyLeave, fetchLeaveList, fetchPendingLeavePage, reviewLeaves} from "@/api/leaveApi";
import { LeaveTypeText} from "@/interface/dict";
import naiveui from "@/utils/naiveui";
import type {Page} from "@/interface/interface";
import {type TableColumns} from "naive-ui-table";
import 'naive-ui-table/dist/style.css';
import {NButton, NButtonGroup} from "naive-ui";
import {NTag} from "naive-ui/lib";
import NaiveUiTablePlus from "@/components/NaiveUiTablePlus.vue";
import AddButton from "@/components/button/AddButton.vue";

const currentTime = ref(new Date().getTime());
const isDateDisabled = (date: Date) => {
  const yesterday = addDays(new Date(), -1);
  return isYesterday(date) || date < yesterday;
};

const handleUpdateValue = (date: number) => {
  currentTime.value = date;
};
const clickedCell = ref();

function handleContextMenu(e: MouseEvent) {
  e.preventDefault();
  // 如果点击目标带有类名disabled的元素，则不显示右键菜单
  if ((<HTMLElement>e.target).classList.contains('n-calendar-cell--disabled')) {
    return;
  }
  clickedCell.value = findClickedCell(e);
  if (clickedCell.value) {
    nextTick().then(() => {
      calContextMenuRef.value?.show();
      xRef.value = e.clientX;
      yRef.value = e.clientY;
    });
  }
}

function findClickedCell(e: MouseEvent) {
  const clickedElement = (<HTMLElement>e.target).firstElementChild;
  if (clickedElement) {
    const attribute = clickedElement.firstElementChild?.getAttribute('title')
    return attribute || null;
  }
  return null;
}

const options: DropdownOption[] = [
  {
    label: '填写请假',
    key: 'leave',
    callback() {
      showModal.value = true;
    },
  },
];
// 右键菜单位置
const xRef = ref(0);
const yRef = ref(0);
// 右键菜单ref
const calContextMenuRef = ref<InstanceType<typeof ContextMenu>>();

const modalFormRef = ref<InstanceType<typeof ModalForm>>();
const showModal = ref(false);
const modalTitle = computed(() => `请假 - ${clickedCell.value}`);
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
const loading = ref(false)

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

const leaveList = ref<LeaveVo[]>();
const preList = ref<ListOption[]>();

function getLeaveList() {
  fetchLeaveList().then(res => {
    leaveList.value = res.data;
    preList.value = res.data.map(item => ({
      id: item.id,
      header: item.start,
      extraType: 'text',
      extraText: LeaveTypeText[<LeaveType>item.type],
      content: item.reason,
      level: item.approved === null ? 'warning' : item.approved ? 'success' : 'error'
    }));
  });
}
function leaveTypeTag(type: LeaveType) {
  return type === 'SICK_LEAVE' ? 'warning' : type === 'PERSONAL_LEAVE' ? 'info' : 'success';
}
const cols: TableColumns<Leave> = [
  {
    type: 'selection',
    multiple: true,
    fixed: 'left',
  },
  {
    title: '工号',
    key: 'sid',
    fixed: 'left',
    align: 'center',
    width: 180,
    render(row) {
      return h('div', {}, {
        default: () => row.staff.sid
      })
    }
  },
  {
    title: '员工',
    key: 'staff',
    fixed: 'left',
    align: 'center',
    width: 100,
    render(row) {
      return h('div', {}, {
        default: () => row.staff.name
      })
    }
  },
  {
    title: '请假类型',
    key: 'type',
    align: 'center',
    width: 100,
    render(row) {
      return h(NTag, {
        type: leaveTypeTag(<LeaveType>row.type)
      }, {
        default: () => LeaveTypeText[<LeaveType>row.type]
      })
    },
  },
  {
    title: '请假原因',
    key: 'reason',
    align: 'center',
    width: 180,
    render(row) {
      return h('span',  { innerHTML: row.reason })
    }
  },
  {
    title: '开始时间',
    key: 'start',
    align: 'center',
    width: 180,
  },
  {
    title: '结束时间',
    key: 'end',
    align: 'center',
    width: 180,
  },
  {
    title: '审批状态',
    key: 'approved',
    align: 'center',
    width: 120,
    fixed: 'right',
    render(row: Leave) {
      return h(NTag, {
        type: row.approved === null ? 'warning' : row.approved ? 'success' : 'error'
      }, {
        default: () => row.approved === null ? '待审批' : row.approved ? '已批准' : '已拒绝'
      })
    }
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 200,
    fixed: 'right',
    render(row: Leave) {
      return h(NButtonGroup, {size: 'small'}, {
        default: () => [
          h(NButton, {
            type: 'info',
            size:'small',
            onClick: () => {
              showModal.value = true;
              reason.value = row.reason;
              nextTick(() => {
                modalFormRef.value?.setValue({
                  type: row.type,
                  reason: row.reason,
                  duration: [row.start, row.end]
                });
              })
            }
          }, () => '查看'),
          h(NButton, {
            type: 'success',
            size:'small',
            onClick: () => {
            }
          }, () => '批准'),
          h(NButton, {
            type: 'error',
            size:'small',
            onClick: () => {
            }
          }, () => '拒绝')
        ]
      })
    }
  }
];
const pendingLeaves = ref<Page<LeaveVo>>();
const tableRef = ref<InstanceType<typeof NaiveUiTablePlus>>();

async function getPendingLeavePage(params: any) {
  return (await fetchPendingLeavePage( params.current, params.size)).data;
}
const selection = ref<Array<string | number>>([]);
function handleBatchReview(status: boolean) {
  console.log('批量审批', selection.value, status);
  reviewLeaves(status, selection.value).then(res => {
    naiveui.message.success(res.msg);
    tableRef.value?.naiveUiTableRef?.refresh();
    selection.value = [];
  });
}
onMounted(() => {
  // getLeaveList();
});
</script>

<template>
  <page-container>
    <context-menu ref="calContextMenuRef" :options="options" :x="xRef" :y="yRef"/>
    <ModalForm
        ref="modalFormRef"
        v-model:show="showModal"
        :schemas="schemas"
        :title="modalTitle"
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
    </ModalForm>

    <flex-grow-card id="leave-page">
      <naive-ui-table-plus
          ref="tableRef"
          :columns="cols"
          :request-api="getPendingLeavePage"
          teleport="#leave-page"
          @selected="(keys) => selection = keys"
      >
        <template #tableHeader>
          <add-button
              label="请假"
              @click="showModal = true"
          />
        </template>
        <template #batch-actions>
          <n-flex>
            <n-button
                type="success"
                @click="handleBatchReview(true)"
            >
              批量审批
            </n-button>
            <n-button
                type="error"
                @click="handleBatchReview(false)"
            >
              批量拒绝
            </n-button>
          </n-flex>
        </template>
      </naive-ui-table-plus>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>
:deep(.aie-container-main) {
  min-height: 200px !important;
}
</style>