<template>
  <scroll-view class="root-patientinfo" scroll-y>
    <view class="headline">{{ patientInfo.name }}</view>
    <AtDivider content="最近一次测量数据" />
    <AtGrid class="grid" :data="data" />
    <AtDivider content="用药计划" />
    <view class="panel">
      <view class="panel-title">服用药物</view>
      <AtList v-for="(drug, index) in state.drugs" :key="index">
        <AtSwipeAction
          autoClose
          :options="options"
          :onClick="onClickSwipe.bind(this, index)"
        >
          <AtListItem
            hasBorder
            class="normal"
            :title="drug.drugName"
            :extraText="`${drug.dosage} ${drug.form} ${drug.dose}`"
          />
        </AtSwipeAction>
      </AtList>
      <!-- <view class="panel-title">服药周期</view>
      <view class="panel-title">服药进度</view> -->
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: "patientInfoPage",
};
</script>

<script setup>
import "./patientInfo.sass";
import Taro from "@tarojs/taro";
import { useLoad } from "@tarojs/taro";
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import PatientInfo from "../../utils/patientInfo";
import { DrugData } from "../../utils/drugData";
import { ref, reactive } from "vue";

// 静态资源
import bloodPressureUrl from "../../images/icons/bloodPressure.svg";
import bloodGlucoseUrl from "../../images/icons/bloodGlucose.svg";
import weightUrl from "../../images/icons/weight.svg";
import heightUrl from "../../images/icons/height.svg";
import heartrateUrl from "../../images/icons/heartrate.svg";
import paO2Url from "../../images/icons/paO2.svg";

// 健康指标
let healthIndicators = ref(getGlobalData("healthIndicators"));
// 患者信息
let patientInfo = ref(new PatientInfo());

// 本页面的一些变量
var state = reactive({
  // 获取药物列表
  drugs: getGlobalData("drugs"),
});

let options = [
  {
    text: "编辑",
    style: {
      backgroundColor: "#6190E8",
    },
  },
  {
    text: "删除",
    style: {
      backgroundColor: "#FF4949",
    },
  },
];
let data = [
  {
    image: heightUrl,
    value:
      "身高\n" + healthIndicators.value.heightData.slice(-1)[0].value + "cm",
  },
  {
    image: weightUrl,
    value:
      "体重\n" + healthIndicators.value.weightData.slice(-1)[0].value + "kg",
  },
  {
    image: bloodPressureUrl,
    value:
      "血压\n" +
      healthIndicators.value.bloodPressureData.slice(-1)[0].high +
      "/" +
      healthIndicators.value.bloodPressureData.slice(-1)[0].low +
      "mmHg",
  },
  {
    image: paO2Url,
    value:
      "血氧饱和度\n" +
      healthIndicators.value.bloodOxygenData.slice(-1)[0].value +
      "%",
  },
  {
    image: bloodGlucoseUrl,
    value:
      "血糖\n" +
      healthIndicators.value.bloodGlucoseData.slice(-1)[0].value +
      "mg/dL",
  },
  {
    image: heartrateUrl,
    value:
      "心率\n" +
      healthIndicators.value.heartRateData.slice(-1)[0].value +
      "次/分钟",
  },
];

// 接收页面传参
useLoad((o) => {
  let id = o.id;
  patientInfo.value = getGlobalData("patients")[id];
});

function onClickSwipe(index, params) {
  console.log(index, params);
  if (params.text === "删除") {
    Taro.showModal({
      title: "提示",
      content: "是否确认删除该药物？",
      confirmText: "确定",
      success: (res) => {
        if (res.confirm) {
          state.drugs.splice(index, 1);
        }
      },
    });
  } else if (params.text === "编辑") {
    // TODO: edit drug
    Taro.navigateTo({ url: `../editDrugPage/editDrug?index=${index}` });
    return;
  }
}
</script>
