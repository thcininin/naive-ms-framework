<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import {h, nextTick, onBeforeUnmount, onMounted, ref} from "vue";
import {addDays, isYesterday} from "date-fns/esm";
import ContextMenu from "@/components/ContextMenu.vue";
import type {DropdownOption} from "@/type/common";
import {type FormProps, type TableColumns} from "naive-ui-table";
import NaiveUiTablePlus from "@/components/NaiveUiTablePlus.vue";
import type {Overtime, OvertimeVo} from "@/interface/overtime";
import AddButton from "@/components/button/AddButton.vue";
import {NButton, NButtonGroup, useDialog} from 'naive-ui'
import naiveui from "@/utils/naiveui";
import {applyOvertime, fetchAllOvertimePage, reviewOvertimes} from "@/api/overtimeApi";
import {NTag} from "naive-ui/lib";
import {RoleOptions} from "@/utils/commonUtil";

const dialog = useDialog();
const value = ref(new Date());
const isDateDisabled = (date: Date) => {
  const yesterday = addDays(new Date(), -1);
  return isYesterday(date) || date < yesterday;
};
const handleUpdateValue = (date: Date) => {
  value.value = date;
};
const clickedCell = ref();
const calContextMenuRef = ref<InstanceType<typeof ContextMenu>>();
const options: DropdownOption[] = [
  {
    label: '加班',
    key: 'leave',
  },
];
// 右键菜单位置
const xRef = ref(0);
const yRef = ref(0);

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

const cols: TableColumns<OvertimeVo> = [
  {
    type: 'selection',
    multiple: true,
    fixed: 'left',
    align: 'center',
    disabled(row) {
      return row.approved !== null
    }
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
    title: '加班日期',
    key: 'date',
    align: 'center',
    width: 180,
  },
  {
    title: '结束时间',
    key: 'endTime',
    align: 'center',
    width: 180,
    render(row) {
      return row.endTime? row.endTime : '暂无'
    }
  },
  {
    title: '加班时长',
    key: 'hours',
    align: 'center',
    width: 100,
    render(row) {
      return row.endTime? row.endTime : '暂无'
    }
  },
  {
    title: '审批状态',
    key: 'approved',
    fixed: 'right',
    align: 'center',
    width: 120,
    render(row) {
      return h(NTag, {
        type: row.approved === null ? 'warning' : row.approved ? 'success' : 'error',
      }, {
        default: () => {
          return row.approved === null ? '待审批' : row.approved ? '已通过' : '已拒绝'
        }
      })
    }
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 180,
    render(row) {
      if(row.approved === null) {
        return h(NButtonGroup, {size: 'small'}, {
          default: () => [
            h(NButton, {
              type: 'success',
              size: 'small',
              onClick: () => {
                selection.value = [<string>row.id];
                handleBatchReview(true);
              }
            }, () => '批准'),
            h(NButton, {
              type: 'error',
              size: 'small',
              onClick: () => {
                selection.value = [<string>row.id];
                handleBatchReview(false);
              }
            }, () => '拒绝')
          ]
        })
      }else {
        return h(NTag, {}, {
          default: () => '已审批'
        })
      }
    }
  }
]
const search: FormProps = {
  schemas: [
    {
      label: '审核状态',
      field: 'approved',
      type: 'radio',
      componentProps: {
        options: [
          {label: '全部', value: null},
          {label: '已通过', value: true},
          {label: '已拒绝', value: false},
        ],
        defaultValue: null,
      }
    },
    {
      label: '员工',
      field: 'staffName',
      type: 'input',
      componentProps: {
        placeholder: '请输入员工姓名',
        clearable: true
      }
    },
    {
      label: '工号',
      field: 'sid',
      type: 'input',
      componentProps: {
        placeholder: '请输入工号',
        clearable: true
      }
    },
  ],
  showResetBtn: true,
  defaultExpand: true
}
function handleConfirm() {
  dialog.info({
    title: '确认',
    content: `是否确认于${new Date().toLocaleDateString()}加班`,
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

async function getAllOvertimePage(params: any) {
  return (await fetchAllOvertimePage(params.current, params.size, params.approved)).data;
}
const selection = ref<Array<string | number>>();
const tableRef = ref<InstanceType<typeof NaiveUiTablePlus>>();
function handleBatchReview(status: boolean) {
  reviewOvertimes(<number[]>selection.value, status).then(res => {
    naiveui.message.success(res.msg);
    selection.value = [];
    tableRef.value?.clearSelected();
    tableRef.value?.naiveUiTableRef?.refresh();
  });
}
</script>

<template>
  <page-container id="overtime-page">
    <context-menu ref="calContextMenuRef" :options="options" :x="xRef" :y="yRef"/>

    <flex-grow-card>
      <naive-ui-table-plus
          ref="tableRef"
          :columns="cols"
          :search-props="search"
          :request-api="getAllOvertimePage"
          teleport="#overtime-page"
          @selected="(keys) => selection = keys"
      >
        <template #tableHeader>
          <add-button
              label="今日加班"
              @click="handleConfirm"
          />
        </template>
        <template #batch-actions>
          <n-flex>
            <n-button
                size="small"
                type="success"
                @click="handleBatchReview(true)"
            >
              批量审批
            </n-button>
            <n-button
                size="small"
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

</style>