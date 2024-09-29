<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import type {TableColumns} from "naive-ui-table";
import {h} from "vue";
import {NButton, NButtonGroup, NTag} from "naive-ui";
import DelButton from "@/components/button/DelButton.vue";
import NaiveUiTablePlus from "@/components/NaiveUiTablePlus.vue";
import {fetchAllPage} from "@/api/roleApi";
import Switch from "@/components/Switch.vue";
import type {RoleVo} from "@/interface/Role";
import naiveui from "@/utils/naiveui";

const cols: TableColumns<RoleVo> = [
  {
    title: '标识',
    key: 'name',
    align: 'center',
    width: 150,
    render(row) {
      return h(NTag, {
        type: 'info',
        bordered: false,
        class: 'min-w-24 flex-inline justify-center items-center'
      }, {
        default: () => row.name
      })
    }
  },
  {
    title: '描述',
    key: 'description',
    align: 'center',
    width: 150,
  },
  {
    title: '状态',
    key: 'active',
    align: 'center',
    width: 100,
    render(row) {
      return h(Switch, {
        value: row.active,
        checkedText: '启用',
        uncheckedText: '禁用',
        onUpdateValue: (v: boolean) => {
          console.log('update value', v);
          row.active = v;
          naiveui.message.create(`${row.name}${v ? '启用' : '禁用'}`, {
            type: v ? 'success' : 'info',
          });
        }
      });
    }
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
        ]
      })
    },
  }
];
async function getAllPage(params: any) {
  return (await fetchAllPage(params.current, params.size)).data;
}
</script>

<template>
  <page-container>
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