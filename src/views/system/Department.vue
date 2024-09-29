<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import NaiveUiTablePlus from "@/components/NaiveUiTablePlus.vue";
import {NaiveUiTable, type TableColumns} from "naive-ui-table";
import type {DepartmentVo} from "@/interface/department";
import {fetchAllPage} from "@/api/departmentApi";
import {computed, h, onMounted, ref} from "vue";
import {NButtonGroup, NButton, NEllipsis} from "naive-ui";
import DelButton from "@/components/button/DelButton.vue";
import ShowOrEdit from "@/components/editableTable/ShowOrEdit.vue";
import {ModalForm, type FormSchema} from 'naive-ui-form';
import type {StaffVoLite} from "@/interface/staff";
import {fetchAllList, getAllList} from "@/api/staffApi";

const showModal = ref(false);
const staffList = ref<StaffVoLite[]>([]);
const cols: TableColumns<DepartmentVo> = [
  {
    title: 'ID',
    key: 'id',
    align: 'center',
    width: 180,
    fixed: 'left',
  },
  {
    title: '部门名称',
    key: 'name',
    align: 'center',
    width: 150,
    fixed: 'left',
    render(row) {
      return h(ShowOrEdit, {
        rawValue: row.name,
        callback: (value) => console.log(value)
      })
    }
  },
  {
    title: '描述',
    key: 'description',
    align: 'center',
    width: 200,
    render(row) {
      return h(NEllipsis, null, {
        default: () => h(ShowOrEdit, {
          rawValue: row.description,
          callback: (value) => console.log(value)
        }),
        tooltip: () => row.description
      })
    }
  },
  {
    title: '创建时间',
    key: 'createdAt',
    align: 'center',
    width: 180,
  },
  {
    title: '部门领导',
    key: 'leader',
    align: 'center',
    width: 150,
    render(row) {
      return h('div', {
        class: 'font-bold text-blue-500 cursor-pointer underline underline-offset-4'
      }, row.leader?.name)
    }
  },
  {
    title: '成员人数',
    key: 'staffs',
    align: 'center',
    width: 100,
    render(row) {
      return h('div', {
        class: 'font-bold text-blue-500 cursor-pointer underline underline-offset-4',
        onClick: () => {
          showModal.value = true;
        }
      }, row.staffs?.length + '人')
    }
  },
  {
    title: '操作',
    key: 'operation',
    align: 'center',
    width: 200,
    fixed: 'right',
    render(row) {
      return h(NButtonGroup, null, {
        default: () => [
          h(NButton, {
            size: 'small',
            type: 'info',
          }, () => '查看'),
          h(NButton, {
            size: 'small',
            type: 'error',
          }, () => '删除')
        ]
      })
    }
  }
];
const transferOptions = staffList.value.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    }
)
const schemas = ref<FormSchema[]>([
  {
    field: 'name',
    type: 'transfer',
    componentProps: {
      options: [],
    }
  },
]);

async function getAllPage(params: any) {
  return (await fetchAllPage(params.current, params.size)).data;
}

function getStaffList() {
  fetchAllList().then(res => {
    staffList.value = res.data;
  })
}

onMounted(() => {
  getStaffList();
});
</script>

<template>
  <page-container>
    <modal-form
        v-model:show="showModal"
        :show-icon="false"
        title="部门成员"
        :schemas="schemas"
        style="width: 800px"
    />

    <flex-grow-card>
      <naive-ui-table-plus
          :columns="cols"
          :request-api="getAllPage"
      />
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>