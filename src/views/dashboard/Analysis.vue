<script setup lang="ts">

import {use} from 'echarts/core';
import {PieChart} from 'echarts/charts';
import {TitleComponent, TooltipComponent, LegendComponent} from 'echarts/components';
import {CanvasRenderer} from 'echarts/renderers';
import type {ComposeOption} from 'echarts/core';
import type {PieSeriesOption} from 'echarts/charts';
import type {TitleComponentOption, TooltipComponentOption, LegendComponentOption} from 'echarts/components';
import VChart from 'vue-echarts'
import PageContainer from "@/components/PageContainer.vue";
import {fetchAllPage} from "@/api/departmentApi";
import {ref, watch} from "vue";
import type {DepartmentVo} from "@/interface/department";

use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);
type EChartsOption = ComposeOption<| TitleComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption>;

const statisticCardOptions = [
  {
    title: '访问量',
    period: '日',
    tagType: 'success',
    value: 12039,
    subTitle: '日同比',
    subValue: '35%',
    subTitle2: '周同比',
    subValue2: '59%',
    footerTitle: '总访问量',
    footerValue: 254245
  },
  {
    title: '销售额',
    period: '周',
    tagType: 'info',
    value: 50982,
    subTitle: '日同比',
    subValue: '35%',
    subTitle2: '周同比',
    subValue2: '59%',
    footerTitle: '总销售额',
    footerValue: 194673
  },
  {
    title: '订单量',
    period: '周',
    tagType: 'info',
    value: 20783,
    subTitle: '日同比',
    subValue: '12%',
    subTitle2: '周同比',
    subValue2: ' 12%',
    footerTitle: '转化率',
    footerValue: 100
  },
  {
    title: '成交额',
    period: '月',
    tagType: 'error',
    value: 55609,
    subTitle: '月同比',
    subValue: '75%',
    subTitle2: '月同比',
    subValue2: ' 77%',
    footerTitle: '总成交额',
    footerValue: 927315
  },

]
const departmentData = ref<DepartmentVo[]>();
// echarts options
const option = ref<EChartsOption>({});
watch(departmentData, (newData) => {
  option.value = {
    title: {
      text: '部门人数比例',
      subtext: `截至 ${ new Date().toLocaleDateString() }`,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        data: newData?.map((item: DepartmentVo) => ({
          value: (!!item.leader ? 1 : 0) + (!!item.staffs ? item.staffs.length : 0),
          name: item.name
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
});
function getDepartmentData() {
  fetchAllPage(1, 10).then(res => {
    departmentData.value = res.data.records;
  });
}
getDepartmentData();
</script>

<template>
  <page-container>
    <n-card class="w-full !h-full !flex-grow">
      <n-grid cols="1 xs:1 s:2 m:4 4" responsive="screen" x-gap="8" y-gap="8" class="mt-2">
        <n-gi v-for="card in statisticCardOptions" :key="card.title">
          <n-card :segmented="{
          content: true,
          footer: 'soft',
        }">
            <template #header>
              <div>
                {{ card.title }}
              </div>
            </template>
            <template #header-extra>
              <n-tag :type="card.tagType">
                {{ card.period }}
              </n-tag>
            </template>
            <n-flex vertical>
              <div class="text-2xl font-bold">
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to="card.value" show-separator />
              </div>
              <n-flex justify="space-between" align="center" class="text-gray-500">
                <div>
                <span>
                  {{ card.subTitle }} {{ card.subValue }}
                </span>
                  <n-icon>
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 29L24 17L36 29H12Z" fill="#7ed321" stroke="#7ed321" stroke-width="4"
                            stroke-linejoin="round" />
                    </svg>
                  </n-icon>
                </div>
                <div>
                <span>
                  {{ card.subTitle2 }} {{ card.subValue2 }}
                </span>
                  <n-icon>
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M36 19L24 31L12 19H36Z" fill="#f8e71c" stroke="#f8e71c" stroke-width="4"
                            stroke-linejoin="round" />
                    </svg>
                  </n-icon>
                </div>
              </n-flex>
            </n-flex>
            <template #footer>
              <n-flex justify="space-between" align="center">
                <div>
                  {{ card.footerTitle }}
                </div>
                <div>
                  <n-number-animation ref="numberAnimationInstRef" :from="0" :to="card.footerValue" show-separator />
                </div>
              </n-flex>
            </template>
          </n-card>
        </n-gi>
      </n-grid>
      <br>
      <v-chart :option="option" class="w-full min-h-96"/>
    </n-card>
  </page-container>
</template>

<style scoped>

</style>