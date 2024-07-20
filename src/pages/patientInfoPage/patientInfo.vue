<template>
  <!-- 若显示不出图片，用原生image组件激活 -->
  <!--
  <image src="../../images/身高.png"></image>
  <image src="../../images/体重秤.png"></image>
  <image src="../../images/血压.png"></image>
  <image src="../../images/血脂.png"></image>
  <image src="../../images/血糖.png"></image>
  <image src="../../images/心率.png"></image>
  -->
  <head :title="patientInfo.name" is_back="true"></head>
  <AtDivider style="margin-top: 160rpx" content="最近一次测量数据" />
  <AtGrid
    class="grid"
    :data="[
      {
        image: '../../images/身高.png',
        value: '身高：' + patientInfo.height + 'cm',
      },
      {
        image: '../../images/体重秤.png',
        value: '体重：' + patientInfo.weight + 'kg',
      },
      {
        image: '../../images/血压.png',
        value: '血压：' + patientInfo.BP + 'mmHg',
      },
      {
        image: '../../images/血脂.png',
        value: '血脂：' + patientInfo.BF + 'mg/dL',
      },
      {
        image: '../../images/血糖.png',
        value: '血糖：' + patientInfo.BG + 'mg/dL',
      },
      {
        image: '../../images/心率.png',
        value: '心率：' + patientInfo.HR + '次/分钟',
      },
    ]"
  />
  <AtDivider content="用药计划" />
  <View class="item">
    <text>服用药物：{{ patientInfo.drug }}</text>
    <text>服药周期：</text>
    <text>服药进度：</text>
  </View>
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
import { ref } from "vue";

let patientInfo = ref(new PatientInfo());
// 接收页面传参
useLoad((o) => {
  let id = o.id;
  patientInfo.value = getGlobalData("patients")[id];
});
</script>
