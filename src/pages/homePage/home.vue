<template>
  <view class="root-home">
    <view v-if="state.untokenDrugs.length !== 0">
      <AtNoticebar
        single
        showMore
        moreText="查看详情"
        icon="bell"
        :onGotoMore="navigateToUntokens"
      >
        {{ state.untokenDrugs.length }} 个药物还没有服用
      </AtNoticebar>
    </view>
    <!-- 没有未服用药物后才可能显示 服用界面 -->
    <view
      v-if="state.timesUp && state.nextDrug !== undefined"
      class="time-up-cover"
    >
      <view class="prompt">请服用下面药物</view>
      <view class="drug-info-container">
        <view class="drug-name">{{ state.nextDrug.drugName }}</view>
        <view class="drug-dose">{{ state.nextDrug.dose }}</view>
        <view class="drug-form">
          {{ state.nextDrug.dosage }} {{ state.nextDrug.form }}
        </view>
      </view>
      <view class="btn-container">
        <AtButton class="skip-btn" @click="done(true)" type="secondary">
          跳过本次用药
        </AtButton>
        <AtButton class="done-btn" @click="done(false)" type="secondary">
          已服药
        </AtButton>
      </view>
    </view>
    <view v-if="drugs.length && state.nextDrug !== undefined">
      <!-- if drugs isn't empty -->
      <view class="headline">距离下次服药时间</view>
      <view class="countdown-container">
        <AtCountdown
          isCard
          isShowDay
          :key="state.clock.seconds"
          :day="state.clock.day"
          :hours="state.clock.hours"
          :minutes="state.clock.minutes"
          :seconds="state.clock.seconds"
          :onTimeUp="onTimeUp"
        />
      </view>
      <view class="alarm-container">
        <AtTag class="tags drug-name" type="primary" circle>
          {{ state.nextDrug.drugName }}
        </AtTag>
        <AtTag class="tags dose" type="primary" circle>
          {{ state.nextDrug.dose }}
        </AtTag>
        <AtTag class="tags dosage" type="primary" circle>
          {{ state.nextDrug.dosage }} {{ state.nextDrug.form }}
        </AtTag>
      </view>
    </view>
    <view class="float-btn-container">
      <view v-if="state.showSecondaryFabs">
        <AtFab
          class="secondary-btn"
          @click="navigateTo('../manageDrugPage/manageDrug')"
          ><view className="at-fab__icon at-icon at-icon-list"></view>
        </AtFab>
        <AtFab
          class="secondary-btn"
          @click="navigateTo('../addDrugPage/addDrug')"
          ><view className="at-fab__icon at-icon at-icon-add"></view>
        </AtFab>
      </view>
      <AtFab class="drug-btn" :onClick="toggleFloatBtn">
        <image class="svg-icon" src="../../images/icons/drug.svg"></image>
      </AtFab>
    </view>
    <view class="headline">健康指标</view>
    <view class="health-info-cards">
      <view class="card-container">
        <AtCard
          note="1天前"
          title="血压"
          :thumb="bloodPressureUrl"
          :extra="healthIndicators.bloodPressureData.slice(-1)[0].date + ' ❯'"
          @click="
            navigateTo('../para2Page/para2?name=bloodPressureData&title=血压')
          "
        >
          <view v-if="healthIndicators.bloodPressureData.length === 0">
            <view class="no-data-text">无数据</view>
          </view>
          <view v-else>
            <view class="data-text">
              {{ healthIndicators.bloodPressureData.slice(-1)[0].low }}/{{
                healthIndicators.bloodPressureData.slice(-1)[0].high
              }}
            </view>
            <view class="unit-text">毫米汞柱</view>
          </view>
        </AtCard>
      </view>
      <view class="card-container">
        <AtCard
          note="1天前"
          title="体重"
          :thumb="weightUrl"
          :extra="healthIndicators.weightData.slice(-1)[0].date + ' ❯'"
          @click="navigateTo('../paraPage/para?name=weightData&title=体重')"
        >
          <view v-if="healthIndicators.weightData.length === 0">
            <view class="no-data-text">无数据</view>
          </view>
          <view v-else>
            <view class="data-text">
              {{ healthIndicators.weightData.slice(-1)[0].value }}
            </view>
            <view class="unit-text">千克</view>
          </view>
        </AtCard>
      </view>
      <view class="card-container">
        <AtCard
          note="1天前"
          title="心率"
          :thumb="heartrateUrl"
          :extra="healthIndicators.heartRateData.slice(-1)[0].date + ' ❯'"
          @click="navigateTo('../paraPage/para?name=heartRateData&title=心率')"
        >
          <view v-if="healthIndicators.heartRateData.length === 0">
            <view class="no-data-text">无数据</view>
          </view>
          <view v-else>
            <view class="data-text">
              {{ healthIndicators.heartRateData.slice(-1)[0].value }}
            </view>
            <view class="unit-text">次/分钟</view>
          </view>
        </AtCard>
      </view>
      <view class="card-container">
        <AtCard
          note="1天前"
          title="血氧饱和度"
          :thumb="paO2Url"
          :extra="healthIndicators.bloodOxygenData.slice(-1)[0].date + ' ❯'"
          @click="
            navigateTo('../paraPage/para?name=bloodOxygenData&title=血氧饱和度')
          "
        >
          <view v-if="healthIndicators.bloodOxygenData.length === 0">
            <view class="no-data-text">无数据</view>
          </view>
          <view v-else>
            <view class="data-text">
              {{ healthIndicators.bloodOxygenData.slice(-1)[0].value }}
            </view>
            <view class="unit-text">%</view>
          </view>
        </AtCard>
      </view>
      <view class="card-container">
        <AtCard
          note="1天前"
          title="血糖"
          :thumb="bloodGlucoseUrl"
          :extra="healthIndicators.bloodGlucoseData.slice(-1)[0].date + ' ❯'"
          @click="
            navigateTo('../paraPage/para?name=bloodGlucoseData&title=血糖')
          "
        >
          <view v-if="healthIndicators.bloodGlucoseData.length === 0">
            <view class="no-data-text">无数据</view>
          </view>
          <view v-else>
            <view class="data-text">
              {{ healthIndicators.bloodGlucoseData.slice(-1)[0].value }}
            </view>
            <view class="unit-text">毫摩尔/升</view>
          </view>
        </AtCard>
      </view>
    </view>
    <AtTabBar fixed :tabList="tabList" :onClick="switchTab" :current="0" />
  </view>
</template>

<script>
export default {
  name: "homePage",
};
</script>

<script setup>
import "./home.sass"; // 引入样式
import Taro from "@tarojs/taro";
// 引用全局变量 https://nervjs.github.io/taro-docs/docs/best-practice#全局变量
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { reactive, ref } from "vue"; // ref声明响应式数据
import { getCurrDate, getCurrTime, switchTab } from "../../utils/global_func";
import { DrugData, DrugRecord, getUntokenDrugs } from "../../utils/drugData";
// Taro 中引用静态资源必须先 import 进来
// https://blog.csdn.net/laishaojiang/article/details/109111562
// https://docs.taro.zone/docs/static-reference/
import bloodPressureUrl from "../../images/icons/bloodPressure.svg";
import bloodGlucoseUrl from "../../images/icons/bloodGlucose.svg";
import weightUrl from "../../images/icons/weight.svg";
import heartrateUrl from "../../images/icons/heartrate.svg";
import paO2Url from "../../images/icons/paO2.svg";
// MQTT req
import { connect, subscribe, publish } from "../../utils/mqtt_req";

// 获取健康指标数据
let drugs = ref(getGlobalData("drugs"));
let drugRecord = ref(getGlobalData("drugRecord"));
// State参数
let state = reactive({
  timesUp: false,
  showSecondaryFabs: false,
  untokenDrugs: [],
  nextDrug: undefined,
  clock: undefined,
});
let tabList = getGlobalData("tabList");
let healthIndicators = getGlobalData("healthIndicators");

function calcDHMS(timeDiff) {
  const t = 1000;
  const m = t * 60;
  const h = m * 60;
  const d = h * 24;
  let day = Math.floor(timeDiff / d);
  let hours = Math.floor((timeDiff - day * d) / h);
  let minutes = Math.floor((timeDiff - hours * h) / m);
  let seconds = Math.floor((timeDiff - hours * h - minutes * m) / t);
  return {
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function navigateTo(url) {
  // 跳转至登录界面
  Taro.navigateTo({ url: url });
}

function navigateToUntokens() {
  navigateTo("../untokensPage/untokens");
}

function onTimeUp(params) {
  // Taro.showToast({
  //   title: "大郎，该吃药了～",
  //   icon: "success",
  //   duration: 2000,
  // });
  state.timesUp = true;
  let box_id = getGlobalData("box_id");
  if (box_id) {
    console.log("publishing to nextdrug.");
    publish(`drug/${box_id}/nextdrug`, state.nextDrug.drugName);
  }
}

function toggleFloatBtn() {
  state.showSecondaryFabs = !state.showSecondaryFabs;
}

function updateToNext() {
  // return;
  // console.log("获取未服药的药物 和 下一次服药的药物");
  // 获取未服药的药物 和 下一次服药的药物
  let untokens = getUntokenDrugs(drugs.value, drugRecord.value);
  state.untokenDrugs = untokens[0];
  state.nextDrug = untokens[1];
  // 计算nextDrug对应的时间，与当前时间做差，得到TimeDiff。传入函数中计算小时、分钟、秒
  let nowTime = new Date().getTime(); // TimeStamp
  state.clock = calcDHMS(DrugRecord.getTime(state.nextDrug) - nowTime);
}

function done(skip = false) {
  console.log("完成服药");
  // 完成服药
  state.timesUp = false;
  drugRecord.value.push(
    new DrugRecord(
      state.nextDrug.id,
      state.nextDrug.drugName,
      state.nextDrug.dosage,
      state.nextDrug.form,
      state.nextDrug.dose,
      getCurrDate(),
      getCurrTime(),
      skip
    )
  );
  updateToNext();
}

function untokenDone(skip = false) {
  // console.log("删除未服药药物");
  // 删除未服药的第一个药物
  let tmp = state.untokenDrugs.shift();
  // 如果选择跳过，虽然仍然会被放入已服用，但是标记skip=true
  tmp.skip = skip;
  // 用于调试
  console.log(`new DrugRecord("${tmp.id}", \
"${tmp.drugName}", \
"${tmp.dosage}", \
"${tmp.form}", \
"${tmp.dose}", \
"${tmp.date}", \
"${tmp.time}", \
${skip})`);
  drugRecord.value.push(tmp);
  updateToNext();
}

// 初始化
updateToNext();
// MQTT
connect();

setInterval(() => {
  console.log("更新数据");
  updateToNext();
  connect();
}, 5000);
</script>
