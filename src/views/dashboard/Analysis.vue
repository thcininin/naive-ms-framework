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
// echarts options
const option = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
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
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        {value: 1048, name: 'Search Engine'},
        {value: 735, name: 'Direct'},
        {value: 580, name: 'Email'},
        {value: 484, name: 'Union Ads'},
        {value: 300, name: 'Video Ads'}
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
</script>

<template>
  <page-container>
    <n-card class="w-full !h-full !flex-grow">
      <v-chart :option="option" class="w-full min-h-96"/>
    </n-card>
  </page-container>
</template>

<style scoped>

</style>