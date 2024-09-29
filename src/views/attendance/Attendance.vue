<script setup lang="ts">

import PageContainer from "@/components/PageContainer.vue";
import FlexGrowCard from "@/components/FlexGrowCard.vue";
import {Check, Checks} from '@vicons/tabler';
import moment from 'moment';
import {computed, onMounted, ref} from "vue";
import {fetchTodayChecks, fetchMyTodayCheck, checkIn, checkOut, fetchMyCheckRecords} from "@/api/checkApi";
import type {CheckState, CheckVo, TodayCheck} from "@/interface/check";
import naiveui from "@/utils/naiveui";
import {addDays, isYesterday} from "date-fns/esm";
import {CheckStateTagType, CheckStateText, CheckTypeText} from "@/interface/dict";

moment.locale('zh-cn')
//
// console.log(moment(new Date().toLocaleDateString()).format('LL'))
const todayCheckList = ref<CheckVo[]>();
const todayChecksCount = computed(() => todayCheckList.value?.length);
const myTodayCheck = ref<TodayCheck>();
const signIn = computed(() => new Date().getHours() < 18);
const accessible = computed<boolean>(() => {
  const currentHours = new Date().getHours();
  return currentHours >= 8 && currentHours < 10 || currentHours >= 18 && currentHours < 22;
});
const selectedTime = ref(new Date().getTime());
const isDateDisabled = (date: Date) => {
  const yesterday = addDays(new Date(), -1);
  return isYesterday(date) || date < yesterday;
};

const handleUpdateValue = (date: number) => {
  // console.log(new Date(date).getDate())
  selectedTime.value = date;
};

function getTodayCheck() {
  fetchTodayChecks().then(res => {
    todayCheckList.value = res.data;
  });
}

function getMyTodayCheck() {
  fetchMyTodayCheck().then(res => {
    myTodayCheck.value = res.data;
  });
}

function handleCheckIn() {
  checkIn().then(res => {
    naiveui.message.success(res.msg);
  })
}

function handleCheckOut() {
  checkOut().then(res => {
    naiveui.message.success(res.msg);
  })
}

const myCheckRecords = ref<CheckVo[]>();
const simplifiedRecords = ref<{}>();
const year = ref<number>(new Date().getFullYear());
const month = ref<number>(new Date().getMonth() + 1);

function handlePanelChange(data: { year: number, month: number }) {
  // console.log(data)
  year.value = data.year;
  month.value = data.month;
  getMyCheckRecords();
}
function getMyCheckRecords() {
  fetchMyCheckRecords(year.value, month.value).then(res => {
    myCheckRecords.value = res.data;
  });
}

onMounted(() => {
  getTodayCheck();
  getMyTodayCheck();
});
</script>

<template>
  <page-container>
    <flex-grow-card>
      <template #header>
        <div>
          日期: {{ moment().format(new Date().toLocaleDateString()) }}
        </div>
      </template>
      <n-grid cols="1 s:1 m:1 l:2 2" responsive="screen" class="w-full h-full flex-1">
        <n-gi class="flex flex-col min-h-64 w-full">
          <n-button
              v-if="myTodayCheck"
              type="primary"
              class="mx-auto w-48 h-48 rounded-full"
              :disabled="!accessible"
              @click="() => signIn ? handleCheckIn() : handleCheckOut()"
          >
            <n-flex justify="center" align="center" vertical>
              <n-icon size="100" :component="signIn ? Check : Checks"/>
              <div v-if="signIn" class="text-center font-bold tracking-widest text-base">
                {{ myTodayCheck.in ? '已签到' : '签到打卡' }}
              </div>
              <div v-if="!signIn" class="text-center font-bold tracking-widest text-base">
                {{ myTodayCheck.out ? '已签退' : '签退打卡' }}
              </div>
            </n-flex>
          </n-button>
          <n-descriptions :column="1" label-placement="left" class="mt-8 mx-auto text-xl font-medium text-gray-500">
            <n-descriptions-item label="今日打卡人数">
              {{ todayChecksCount }}
            </n-descriptions-item>
          </n-descriptions>
        </n-gi>
        <n-gi>
          <n-tabs
              type="segment"
              @update:value="(v: string) => {
                if(v === 'my') {getMyCheckRecords();}
              }"
          >
            <n-tab-pane name="today" tab="今日打卡榜">
              <n-scrollbar style="max-height: 600px;">
                <n-list hoverable>
                  <template #header>
                    <div class="text-base font-bold text-gray-500">
                      今日打卡
                    </div>
                  </template>
                  <n-list-item v-for="check in todayCheckList" class="">
                    <template #suffix>
                      <div class="w-1 h-8 bg-green-500">
                      </div>
                    </template>
                    <n-flex>
                      <div>{{ check.staff.name }}</div>
                      <div>{{ check.checkAt }}</div>
                      <n-tag
                          size="small"
                          :type="CheckStateTagType[check.state]"
                      >
                        <template #icon>
                          <n-icon :component="check.type == 'IN' ? Check : Checks"/>
                        </template>
                        {{CheckTypeText[check.type]}}
                      </n-tag>
                    </n-flex>
                  </n-list-item>
                </n-list>
              </n-scrollbar>
            </n-tab-pane>
            <n-tab-pane name="my" tab="我的打卡记录">
              <n-calendar
                  v-model:value="selectedTime"
                  :is-date-disabled="isDateDisabled"
                  @update:value="handleUpdateValue"
                  @panel-change="handlePanelChange"
                  class="w-full h-96"
              >
                <template #default="{ year, month, date }">
                  <div
                      v-if="myCheckRecords && myCheckRecords.length > 0"
                      v-for="record in myCheckRecords"
                  >
                    <n-flex
                        v-if="record.checkAt.slice(8, 10) == date"
                        justify="center"
                        align="center"
                    >
                      <n-tag
                          round
                          size="small"
                          :type="CheckStateTagType[record.state]"
                      >
                        {{ CheckTypeText[record.type] }}
                        <template #icon>
                          <n-icon
                              :component="record.type === 'IN' ? Check : Checks"
                          />
                        </template>
                      </n-tag>
                    </n-flex>
                    <div v-else>
                      {{ year }}-{{ date }}-{{ month < 10 ? '0' + month : month }}
                    </div>
                  </div>
                  <div v-else>
                    {{ year }}-{{ date }}-{{ month < 10 ? '#' + month : month }}
                  </div>
                </template>
                <template #header="{ year, month }">
                  {{ year }}年{{ month }}月
                </template>
              </n-calendar>
            </n-tab-pane>
          </n-tabs>
        </n-gi>
      </n-grid>
    </flex-grow-card>
  </page-container>
</template>

<style scoped>
</style>