<template>
  <View>
    <View v-if="drugs.length">
      <!-- if drugs isn't empty -->
      <View class="headline">距离下次服药时间</View>
      <View class="countdown-container">
        <AtCountdown
          isCard
          :day="state.clock.day"
          :hours="state.clock.hours"
          :minutes="state.clock.minutes"
          :seconds="state.clock.seconds"
        />
      </View>
      <View class="alarm-container">
        <AtTag class="tags drug-name" type="primary" circle>
          {{ state.nextDrug.drugName }}
        </AtTag>
        <AtTag class="tags dose" type="primary" circle>
          {{ state.nextDrug.dose }}
        </AtTag>
        <AtTag class="tags dosage" type="primary" circle>
          {{ state.nextDrug.dosage }} {{ state.nextDrug.form }}
        </AtTag>
      </View>
    </View>
    <View class="float-btn-container">
      <View v-if="state.showSecondaryFabs">
        <AtFab
          class="secondary-btn"
          @click="navigateTo('../manageDrugPage/manageDrug')"
          ><Text className="at-fab__icon at-icon at-icon-list"></Text>
        </AtFab>
        <AtFab
          class="secondary-btn"
          @click="navigateTo('../addDrugPage/addDrug')"
          ><Text className="at-fab__icon at-icon at-icon-add"></Text>
        </AtFab>
      </View>
      <AtFab class="drug-btn" @click="toggleFloatBtn">
        <image class="svg-icon" src="../../images/icons/drug.svg"></image>
      </AtFab>
    </View>
    <View class="headline">健康指标</View>
    <View class="health-info-cards">
      <View class="card-container">
        <AtCard
          note="1天前"
          title="血压"
          :thumb="bloodPressureUrl"
          :extra="
            healthIndicators.bloodPressureData[
              healthIndicators.bloodPressureData.length - 1
            ].date
          "
          @click="
            navigateTo('../para2Page/para2?name=bloodPressureData&title=血压')
          "
        >
          <View v-if="healthIndicators.bloodPressureData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{
                healthIndicators.bloodPressureData[
                  healthIndicators.bloodPressureData.length - 1
                ].low
              }}/{{
                healthIndicators.bloodPressureData[
                  healthIndicators.bloodPressureData.length - 1
                ].high
              }}
            </View>
            <View class="unit-text">毫米汞柱</View>
          </View>
        </AtCard>
      </View>
      <View class="card-container">
        <AtCard
          note="1天前"
          title="体重"
          :thumb="weightUrl"
          :extra="
            healthIndicators.weightData[healthIndicators.weightData.length - 1]
              .date
          "
          @click="navigateTo('../paraPage/para?name=weightData&title=体重')"
        >
          <View v-if="healthIndicators.weightData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{
                healthIndicators.weightData[
                  healthIndicators.weightData.length - 1
                ].value
              }}
            </View>
            <View class="unit-text">千克</View>
          </View>
        </AtCard>
      </View>
      <View class="card-container">
        <AtCard
          note="1天前"
          title="心率"
          :thumb="heartrateUrl"
          :extra="
            healthIndicators.heartRateData[
              healthIndicators.heartRateData.length - 1
            ].date
          "
          @click="navigateTo('../paraPage/para?name=heartRateData&title=心率')"
        >
          <View v-if="healthIndicators.heartRateData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{
                healthIndicators.heartRateData[
                  healthIndicators.heartRateData.length - 1
                ].value
              }}
            </View>
            <View class="unit-text">次/分钟</View>
          </View>
        </AtCard>
      </View>
      <View class="card-container">
        <AtCard
          note="1天前"
          title="血氧饱和度"
          :thumb="paO2Url"
          :extra="
            healthIndicators.bloodOxygenData[
              healthIndicators.bloodOxygenData.length - 1
            ].date
          "
          @click="
            navigateTo('../paraPage/para?name=bloodOxygenData&title=血氧饱和度')
          "
        >
          <View v-if="healthIndicators.bloodOxygenData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{
                healthIndicators.bloodOxygenData[
                  healthIndicators.bloodOxygenData.length - 1
                ].value
              }}
            </View>
            <View class="unit-text">%</View>
          </View>
        </AtCard>
      </View>
      <View class="card-container">
        <AtCard
          note="1天前"
          title="血糖"
          :thumb="bloodGlucoseUrl"
          :extra="
            healthIndicators.bloodGlucoseData[
              healthIndicators.bloodGlucoseData.length - 1
            ].date
          "
          @click="
            navigateTo('../paraPage/para?name=bloodGlucoseData&title=血糖')
          "
        >
          <View v-if="healthIndicators.bloodGlucoseData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{
                healthIndicators.bloodGlucoseData[
                  healthIndicators.bloodGlucoseData.length - 1
                ].value
              }}
            </View>
            <View class="unit-text">毫摩尔/升</View>
          </View>
        </AtCard>
      </View>
    </View>
    <AtTabBar fixed :tabList="tabList" @click="switchTab" :current="0" />
  </View>
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
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";
import { reactive, ref } from "vue"; // ref声明响应式数据
import { switchTab } from "../../utils/global_func";
import { getNextDrug } from "../../utils/drugData";
// Taro 中引用静态资源必须先 import 进来
// https://blog.csdn.net/laishaojiang/article/details/109111562
// https://docs.taro.zone/docs/static-reference/
import bloodPressureUrl from "../../images/icons/bloodPressure.svg";
import bloodGlucoseUrl from "../../images/icons/bloodGlucose.svg";
import weightUrl from "../../images/icons/weight.svg";
import heartrateUrl from "../../images/icons/heartrate.svg";
import paO2Url from "../../images/icons/paO2.svg";

// 获取健康指标数据
let drugs = ref(getGlobalData("drugs"));
// 获取下一次服药的药物
let next = getNextDrug(drugs.value);
let state = reactive({
  showSecondaryFabs: false,
  nextDrug: drugs.value[next.index],
  clock: calcHouMinAndSecs(next.timeDiff),
});
let tabList = getGlobalData("tabList");
let healthIndicators = getGlobalData("healthIndicators");

function calcHouMinAndSecs(timeDiff) {
  console.log("Diff:", timeDiff);
  const t = 1000;
  const m = t * 60;
  const h = m * 60;
  const d = h * 24;
  let day = Math.floor(timeDiff / d);
  console.log("Day:", day);
  let hours = Math.floor((timeDiff - day * d) / h);
  console.log("Hours:", hours);
  let minutes = Math.floor((timeDiff - hours * h) / m);
  console.log("Minutes:", minutes);
  let seconds = Math.floor((timeDiff - hours * h - minutes * m) / t);
  console.log("Seconds:", seconds);
  return {
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function handleClick(value) {
  console.log(value);
}

function navigateTo(url) {
  // 跳转至登录界面
  Taro.navigateTo({ url: url });
}

function onTimeUp(params) {
  Taro.showToast({
    title: "大郎，该吃药了～",
    icon: "success",
    duration: 2000,
  });
}

function toggleFloatBtn() {
  state.showSecondaryFabs = !state.showSecondaryFabs;
  console.log(state.showSecondaryFabs);
}
</script>
