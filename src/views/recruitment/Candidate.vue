<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import {h, ref} from "vue";
import {type TableColumns} from "naive-ui-table";
import NaiveUiTablePlus from "@/components/NaiveUiTablePlus.vue";
import ShowOrEdit from "@/components/editableTable/ShowOrEdit.vue";
import {fetchCandidatesList} from "@/api/candidateApi";
import type {CandidateVo} from "@/interface/candidate";
import {NButton, NButtonGroup, NTag} from "naive-ui";
import {type Gender, GenderText} from "@/interface/dict";
import DelButton from "@/components/button/DelButton.vue";

const cols: TableColumns<CandidateVo> = [
  {
    type: 'selection',
    multiple: true,
    fixed: 'left',
    disabled(row) {
      return row.passed !== null;
    }
  },
  {
    title: '姓名',
    key: 'name',
    width: 100,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '性别',
    key: 'gender',
    align: 'center',
    width: 100,
    render(row) {
      return h('div', {}, {
        default: () => GenderText[<Gender>row.gender]
      })
    }
  },
  {
    title: '投递岗位',
    key: 'job',
    width: 180,
     align: 'center',
    render(row) {
      return h(NTag, {
        type: 'info'
      }, {
        default: () => row.jobVo.name
      })
    }
  },
  {
    title: '邮箱',
    key: 'email',
    width: 180,
     align: 'center',
  },
  {
    title: '联系方式',
    key: 'phone',
    width: 180,
     align: 'center',
  },
  {
    title: '是否通过',
    key: 'passed',
    width: 100,
    align: 'center',
    fixed: 'right',
    render(row) {
      return h(NTag, {
        type: row.passed ? 'success' : 'error'
      }, {
        default: () => row.passed ? '已通过' : '未通过'
      })
    }
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 220,
    render(row) {
      if(row.passed !== null) {
        return h(DelButton, {
          type: 'error',
          label: '删除记录'
        })
      }else {
        return h(NButtonGroup, {}, {
          default: () => [
            h(NButton, {
              type: 'info',
              onClick: () => {
              }
            }, {
              default: () => '通知面试'
            }),
            h(NButton, {
              type: 'success',
              onClick: () => {
              }
            }, {
              default: () => '通过'
            }),
            h(NButton, {
              type: 'error',
              onClick: () => {
              }
            }, {
              default: () => '拒绝'
            })
          ]
        })
      }
    }
  }
]
async function getCandidateList(params: any) {
  return (await fetchCandidatesList(params.current, params.size)).data;
}
</script>

<template>
  <page-container id="candidate-page">

    <flex-grow-card>
      <naive-ui-table-plus
          :columns="cols"
          :request-api="getCandidateList"
          teleport="#candidate-page"
          @selected="(keys) => console.log(keys)"
      >
        <template #batch-actions>
          <n-flex>
            <n-button
                type="success"
            >
              批量通过
            </n-button>
            <n-button
                type="error"
            >
              批量拒绝
            </n-button>
          </n-flex>
        </template>
      </naive-ui-table-plus>
    </flex-grow-card>
  </page-container>
</template>

<style lang="postcss">

</style>