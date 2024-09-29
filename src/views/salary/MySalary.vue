<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import NaiveUiTablePlus from "@/components/NaiveUiTablePlus.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import type {TableColumns} from "naive-ui-table";
import {fetchMySalaryPage} from "@/api/salaryApi";
import {h} from "vue";
import type {IssuedMethod, SalaryVo} from "@/interface/salary";
import {NTag, NButtonGroup, NButton} from 'naive-ui';
import {ConfirmedText, IssuedMethodText, IssuedText} from "@/interface/dict";

const cols: TableColumns<SalaryVo> = [
  {
    type: 'selection',
    multiple: true,
    fixed: 'left',
    align: 'center',
    disabled(row) {
      return <boolean>row.confirmed
    }
  },
  {
    title: '月份',
    key: 'yrMth',
    fixed: 'left',
    align: 'center',
    width: 100,
  },
  {
    title: '实发',
    key: 'actualSalary',
    align: 'center',
    width: 100,
    render(row) {
      return h(NTag, {
        type: 'success',
        bordered: false,
      }, {
        default: () => row.actualSalary
      })
    },
  },
  {
    title: '基础薪资',
    key: 'basicSalary',
    align: 'center',
    width: 100,
  },
  {
    title: '税前薪资',
    key: 'beforeTaxSalary',
    align: 'center',
    width: 100,
  },
  {
    title: '奖金',
    key: 'bonus',
    align: 'center',
    width: 100,
    render(row) {
      return h(NTag, {
        type: 'success',
        bordered: false,
      }, {
        default: () => row.bonus
      })
    },
  },
  {
    title: '扣除',
    key: 'deduction',
    align: 'center',
    width: 100,
    render(row) {
      return h(NTag, {
        type: 'error',
        bordered: false,
      }, {
        default: () => row.deduction
      })
    }
  },
  {
    title: '加班',
    key: 'overtimeSalary',
    align: 'center',
    width: 100,
    render(row) {
      return h(NTag, {
        type: 'success',
        bordered: false,
      }, {
        default: () => row.overtimeSalary
      })
    }
  },
  {
    title: '纳税',
    key: 'tax',
    align: 'center',
    width: 100,
    render(row) {
      return h(NTag, {
        type: 'warning',
        bordered: false,
      }, {
        default: () => row.tax
      })
    }
  },
  {
    title: '是否发放',
    key: 'issued',
    align: 'center',
    width: 100,
    render(row) {
      return h('div', {}, {
        default: () => IssuedText[<string>row.issued]
      })
    }
  },
  {
    title: '发放形式',
    key: 'method',
    align: 'center',
    width: 100,
    render(row) {
      return h(NTag, {
        type: 'info',
        bordered: false,
      }, {
        default: () => IssuedMethodText[row.method]
      })
    }
  },
  {
    title: '发放时间',
    key: 'issueDate',
    align: 'center',
    width: 180,
  },
  {
    title: '是否确认',
    key: 'confirmed',
    align: 'center',
    width: 100,
    render(row) {
      return h('div', {}, {
        default: () => ConfirmedText[<string>row.confirmed]
      })
    }
  },
  {
    title: '确认时间',
    key: 'confirmedDate',
    align: 'center',
    width: 180,
  },
  {
    title: '备注',
    key:'remark',
    fixed: 'right',
    align: 'center',
    width: 180,
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    align: 'center',
    width: 180,
    render(row) {
      if(row.confirmed) {
        return h(NTag, {

        }, {
          default: () => '已确认'
        });
      }else {
        return h(NButtonGroup, {}, {
          default: () => [
            h(NButton, {
              type: 'info',
              size: 'small',
              onClick: () => {
                console.log(row)
              }
            }, {
              default: () => '确定'
            })
          ]
        });
      }
    },
  }
]
async function getMySalaryPage(params: any) {
  return (await fetchMySalaryPage(params.current, params.size)).data;
}
</script>

<template>
  <page-container>
    <flex-grow-card>
      <naive-ui-table-plus
          :columns="cols"
          :request-api="getMySalaryPage"
      />
    </flex-grow-card>
  </page-container>
</template>

<style scoped>

</style>