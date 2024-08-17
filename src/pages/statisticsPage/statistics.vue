<template>
  <view class="root-statistics">
    <AtCalendar :currentDate="state.currDate" :onDayClick="switchDay" />
    <!-- <AtDivider :content="state.currDate" /> -->
    <view class="panel-title">服药进度 ({{ state.currDate }})</view>
    <scroll-view scroll-y>
      <view class="timeline-container">
        <AtTimeline pending :items="state.timeline"> </AtTimeline>
      </view>
    </scroll-view>
    <AtTabBar fixed :onClick="switchTab" :tabList="tabList" :current="1" />
  </view>
</template>

<script>
export default {
  name: "statisticsPage",
};
</script>

<script setup>
import "./statistics.sass";
import Taro from "@tarojs/taro";
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { reactive, ref } from "vue";
import { DrugRecord, getFutureDrugs } from "../../utils/drugData";
import { getCurrDate, switchTab } from "../../utils/global_func";

let tabList = getGlobalData("tabList");
let drugs = ref(getGlobalData("drugs"));
let drugRecord = ref(getGlobalData("drugRecord"));

let state = reactive({
  // example: 2024-07-18
  currDate: getCurrDate(),
  timeline: ref([]),
});

function genItemsFromDrugs() {
  // 从药物记录表生成时间线
  let timelineTmp = [];
  let nowTime = new Date().getTime();
  // 遍历drugRecord
  drugRecord.value.forEach((record) => {
    // 生成时间线的每一项
    if (record.date === state.currDate) {
      if (DrugRecord.getTime(record) < nowTime) {
        // 现在这个判断必然是true了
        if (record.skip) {
          // 用药是否被跳过
          timelineTmp.push({
            title: record.time + " · " + record.drugName,
            content: [record.dosage + record.form + " " + record.dose],
            icon: "alert-circle",
            color: "yellow",
          });
        } else {
          timelineTmp.push({
            title: record.time + " · " + record.drugName,
            content: [record.dosage + record.form + " " + record.dose],
            icon: "check-circle",
            color: "green",
          });
        }
      }
    }
  });

  // 遍历当天的未来药物
  let morning = new Date(state.currDate + "T00:00:00").getTime();
  let night = new Date(state.currDate + "T24:00:00").getTime();
  let futureDrugs = getFutureDrugs(
    drugs.value,
    drugRecord.value,
    // 如果选中日期和当前日期相同则传入now
    getCurrDate() === state.currDate ? nowTime : morning,
    // 当天夜晚24点
    night
  );
  futureDrugs.forEach((record) => {
    timelineTmp.push({
      title: record.time + " · " + record.drugName,
      content: [record.dosage + record.form + " " + record.dose],
      icon: "help",
      color: "blue",
    });
  });
  // console.log(timelineTmp);
  state.timeline = timelineTmp;
}

function switchDay(params) {
  state.currDate = params.value;
  // 重新生成时间线
  genItemsFromDrugs();
}

// 初始化
genItemsFromDrugs();
</script>
