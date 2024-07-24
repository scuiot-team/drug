<template>
  <View>
    <!-- 如果还有药物没有服用，则出示该弹窗 -->
    <View v-if="state.untokenDrugs.length !== 0" class="time-up-cover warning">
      <View class="prompt">
        您还有 {{ state.untokenDrugs.length }} 个药物还没有服用
      </View>
      <View class="drug-info-container">
        <View class="drug-name">{{ state.untokenDrugs[0].drugName }}</View>
        <View class="drug-dose">{{ state.untokenDrugs[0].dose }}</View>
        <View class="drug-form">
          {{ state.untokenDrugs[0].dosage }}
          {{ state.untokenDrugs[0].form }}
        </View>
      </View>
      <View class="btn-container">
        <AtButton class="skip-btn" @click="untokenDone(true)" type="secondary">
          忽略提醒
        </AtButton>
        <AtButton class="done-btn" @click="untokenDone(false)" type="secondary">
          已服药
        </AtButton>
      </View>
      <View class="drug-date">
        该药应于
        {{ state.untokenDrugs[0].date }}
        {{ state.untokenDrugs[0].time }}
        服用
      </View>
    </View>
    <!-- 没有未服用药物后才可能显示 服用界面 -->
    <View
      v-else-if="state.timesUp && state.nextDrug !== undefined"
      class="time-up-cover"
    >
      <View class="prompt">请服用下面药物</View>
      <View class="drug-info-container">
        <View class="drug-name">{{ state.nextDrug.drugName }}</View>
        <View class="drug-dose">{{ state.nextDrug.dose }}</View>
        <View class="drug-form">
          {{ state.nextDrug.dosage }} {{ state.nextDrug.form }}
        </View>
      </View>
      <View class="btn-container">
        <AtButton class="skip-btn" @click="done(true)" type="secondary">
          跳过本次用药
        </AtButton>
        <AtButton class="done-btn" @click="done(false)" type="secondary">
          已服药
        </AtButton>
      </View>
    </View>
    <View v-if="drugs.length && state.nextDrug !== undefined">
      <!-- if drugs isn't empty -->
      <View class="headline">距离下次服药时间</View>
      <View class="countdown-container">
        <AtCountdown
          isCard
          isShowDay
          :day="state.clock.day"
          :hours="state.clock.hours"
          :minutes="state.clock.minutes"
          :seconds="state.clock.seconds"
          :onTimeUp="onTimeUp"
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
      <AtFab class="drug-btn" :onClick="toggleFloatBtn">
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
          :extra="healthIndicators.bloodPressureData.slice(-1)[0].date + ' ❯'"
          @click="
            navigateTo('../para2Page/para2?name=bloodPressureData&title=血压')
          "
        >
          <View v-if="healthIndicators.bloodPressureData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{ healthIndicators.bloodPressureData.slice(-1)[0].low }}/{{
                healthIndicators.bloodPressureData.slice(-1)[0].high
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
          :extra="healthIndicators.weightData.slice(-1)[0].date + ' ❯'"
          @click="navigateTo('../paraPage/para?name=weightData&title=体重')"
        >
          <View v-if="healthIndicators.weightData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{ healthIndicators.weightData.slice(-1)[0].value }}
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
          :extra="healthIndicators.heartRateData.slice(-1)[0].date + ' ❯'"
          @click="navigateTo('../paraPage/para?name=heartRateData&title=心率')"
        >
          <View v-if="healthIndicators.heartRateData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{ healthIndicators.heartRateData.slice(-1)[0].value }}
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
          :extra="healthIndicators.bloodOxygenData.slice(-1)[0].date + ' ❯'"
          @click="
            navigateTo('../paraPage/para?name=bloodOxygenData&title=血氧饱和度')
          "
        >
          <View v-if="healthIndicators.bloodOxygenData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{ healthIndicators.bloodOxygenData.slice(-1)[0].value }}
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
          :extra="healthIndicators.bloodGlucoseData.slice(-1)[0].date + ' ❯'"
          @click="
            navigateTo('../paraPage/para?name=bloodGlucoseData&title=血糖')
          "
        >
          <View v-if="healthIndicators.bloodGlucoseData.length === 0">
            <View class="no-data-text">无数据</View>
          </View>
          <View v-else>
            <View class="data-text">
              {{ healthIndicators.bloodGlucoseData.slice(-1)[0].value }}
            </View>
            <View class="unit-text">毫摩尔/升</View>
          </View>
        </AtCard>
      </View>
    </View>
    <AtTabBar fixed :tabList="tabList" :onClick="switchTab" :current="0" />
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
import { connect, subscribe } from "../../utils/mqtt_req";

// 获取健康指标数据
let drugs = ref(getGlobalData("drugs"));
let drugRecord = ref(getGlobalData("drugRecord"));
// State参数
let state = reactive({
  timesUp: true,
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

function onTimeUp(params) {
  // Taro.showToast({
  //   title: "大郎，该吃药了～",
  //   icon: "success",
  //   duration: 2000,
  // });
  state.timesUp = true;
}

function toggleFloatBtn() {
  state.showSecondaryFabs = !state.showSecondaryFabs;
  console.log("connecting...");
  console.log(drugRecord.value);
  connect();
  setTimeout(() => {
    subscribe("hello");
  }, 5000);
}

function updateToNext() {
  // return;
  console.log("获取未服药的药物 和 下一次服药的药物");
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
  console.log("删除未服药药物");
  // 删除未服药的第一个药物
  let tmp = state.untokenDrugs.shift();
  // 如果选择跳过，虽然仍然会被放入已服用，但是标记skip=true
  tmp.skip = skip;
  drugRecord.value.push(tmp);
  updateToNext();
}

// 初始化
updateToNext();
</script>
