<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import {h, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import NaiveUiTablePlus from "@/components/NaiveUiTablePlus.vue";
import type {DropdownOption} from "@/type/common";
import ShowOrEdit from "@/components/editableTable/ShowOrEdit.vue";
import {NButton, NButtonGroup, NDropdown, NTag, NFlex} from "naive-ui";
import ContextMenu from "@/components/ContextMenu.vue";
import type {TableColumns, FormProps} from "naive-ui-table";
import DelButton from "@/components/button/DelButton.vue";
import {fetchAccountPage} from "@/api/accountApi";
import {RoleDropdownOptions, RoleOptions} from "@/utils/commonUtil";
import {type Role, RoleText} from "@/interface/dict";
import type {AccountVo} from "@/interface/account";
import FlexGrowCard from "@/components/FlexGrowCard.vue";

const accList = ref<AccountVo[]>();
const cols: TableColumns<AccountVo> = [
  {
    title: '用户名',
    key: 'username',
    align: 'center',
    width: 150,
    render(row) {
      return h(ShowOrEdit, {
        rawValue: row.username,
        callback: (v) => {
          console.log(v);
          const index = accList.value!.findIndex(a => a.id === row.id);
          accList.value![index].username = v;
        }
      });
    },
  },
  {
    title: '角色列表',
    key: 'roles',
    align: 'center',
    width: 180,
    render(row) {
      return h(NFlex, {
        justify: 'center',
        align: 'center',
      }, {
        default: () => row.roles.map(role => h(NTag, {
          type: 'info',
          class: 'text-center'
        }, {
          default: () => role.description
        }))
      })
    }
  },
  {
    title: '员工',
    key: 'staff',
    align: 'center',
    width: 150,
    render(row) {
      return h(NButton, {
        text: true
      }, {
        default: () => row.staff.name
      })
    }
  },
  {
    title: '工号',
    key: 'sid',
    align: 'center',
    width: 180,
    render(row) {
      return h('div', {}, {
        default: () => row.staff.sid
      })
    }
  },
  {
    title: '职位',
    key: 'job',
    align: 'center',
    width: 180,
    render(row) {
      return h(NTag, {
        type: 'info',
      }, {
        default: () => row.staff.job.name
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
    title: '操作',
    key: 'operations',
    fixed: 'right',
    align: 'center',
    width: 180,
    render(row) {
      return h(NButtonGroup, {
        size: 'small',
      }, {
        default: () => [
          h(DelButton, {
            type: 'error',
            size: 'small',
            onClick: () => console.log('delete', row)
          }, () => '删除'),
          h(NButton, {
            type: 'warning',
            size: 'small',
            onClick: () => console.log('reset', row)
          }, () => '重置密码')
        ]
      })
    },
  }
];
const selectedRole = ref<string | null>(null);
const search: FormProps = {
  schemas: [
    {
      label: '角色',
      field: 'role',
      type: 'select',
      componentProps: {
        placeholder: '请选择角色',
        options: RoleOptions,
        clearable: true,
        onUpdateValue: (v: string) => {
          selectedRole.value = v;
        }
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
    {
      label: '职位',
      field: 'job',
      type: 'select',
      componentProps: {
        placeholder: '请输入职位',
        options: []
      }
    },
  ],
  showResetBtn: true,
  defaultExpand: true
}
const options: DropdownOption[] = [
  {
    label: '编辑',
    key: 'edit'
  },
  {
    label: '删除',
    key: 'delete'
  }
];
// 右键菜单位置
const xRef = ref(0);
const yRef = ref(0);
// 右键菜单ref
const tableContextMenuRef = ref<InstanceType<typeof ContextMenu>>();
const striped = ref(false);

function handleTabsContextMenu(e: MouseEvent) {
  e.preventDefault();
  findClickedTab(e);
  nextTick().then(() => {
    tableContextMenuRef.value?.show();
    xRef.value = e.clientX;
    yRef.value = e.clientY;
  });
}

function findClickedTab(e: MouseEvent) {
  const clickedElement = e.target as HTMLElement;
  const tabElement = <HTMLElement>clickedElement.parentElement;
  if (tabElement) {
    const attribute = tabElement.getAttribute('data-name');
    return attribute || null;
  }
  return null;
}

async function get(params: any) {
  params.role = selectedRole.value;
  const res = await fetchAccountPage(params.current, params.size, params.role, params.staffName, params.sid);
  accList.value = res.data.records;
  return res.data;
}

// onMounted(async () => {
//   console.log('account mounted')
// });
// onBeforeUnmount(() => {
//   console.log('account before unmount')
// })
// onUnmounted(() => {
//   console.log('account unmounted')
// })
</script>

<template>
  <page-container>
    <flex-grow-card>
      <naive-ui-table-plus
          :columns="cols"
          :request-api="get"
          :search-props="search"
      />
      <context-menu ref="tableContextMenuRef" :options="options" :x="xRef" :y="yRef"/>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>
</style>