<template>
  <View class="root">
    <View class="headline"> 添加药物 </View>
    <View class="panel">
      <View class="panel-title">药物信息</View>
      <AtList>
        <AtInput
          style="margin-left: 12px"
          name="value1"
          title="药物名称"
          type="text"
          placeholder="请输入药物名称"
          :value="state.drugName"
          :onChange="onDrugNameChange"
        />
        <Picker mode="selector" :range="state.dose" :onChange="onDoseChange">
          <AtListItem
            title="服用方式"
            :extraText="state.doseChecked"
            hasBorder
          />
        </Picker>
        <AtInput
          title="服药剂量"
          type="number"
          placeholder="请输入数字"
          :value="state.dosage"
          :onChange="onDosageChange"
        />
        <Picker mode="selector" :range="state.form" :onChange="onFormChange">
          <AtListItem
            title="药物剂型"
            :extraText="state.formChecked"
            hasBorder
          />
        </Picker>
      </AtList>
    </View>
    <View class="panel">
      <View class="panel-title">服药信息</View>
      <AtList hasBorder>
        <Picker
          mode="time"
          :value="state.intervalSelected"
          :onChange="onIntervalChange"
        >
          <AtListItem
            title="服药间隔"
            :extraText="state.intervalText"
            hasBorder
          />
        </Picker>
        <Picker
          mode="date"
          :value="state.startDateSelected"
          :onChange="onStartDateChange"
        >
          <AtListItem
            title="开始服用日期"
            :extraText="state.startDateSelected"
            hasBorder
          />
        </Picker>
        <Picker
          mode="time"
          :value="state.timeSelected"
          :onChange="onTimeChange"
        >
          <AtListItem
            title="开始服用时间"
            :extraText="state.timeSelected"
            hasBorder
          />
        </Picker>
        <Picker
          mode="date"
          :value="state.stopDateSelected"
          :onChange="onStopDateChange"
        >
          <AtListItem
            title="停药日期"
            :extraText="state.stopDateSelected"
            hasBorder
          />
        </Picker>
      </AtList>
    </View>
    <AtButton class="save-btn" type="primary" size="normal" :onClick="addDrug">
      添加
    </AtButton>
  </View>
</template>

<script>
export default {
  name: "addDrugPage",
};
</script>

<script setup>
import Taro from "@tarojs/taro";
import "./addDrug.sass";
// 要使 state 对象在组件中可用，需要使用 reactive 函数将其包装
import { reactive, ref } from "vue";
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { getCurrDate, getCurrTime } from "../../utils/global_func";
import { DrugData } from "../../utils/drugData";

// 获取页面传入的参数
const params = Taro.getCurrentInstance().router.params;
console.log(params);

// 获取药物列表
var drugs = ref(getGlobalData("drugs"));
// 本页面的一些变量
var state = reactive({
  dosage: "",
  drugName: "",
  dose: ["口服", "含服", "吸入", "外用", "滴眼", "滴耳", "静脉注射"], // 给药方式
  form: ["片", "胶囊", "糖浆", "散", "滴"], // 剂型
  doseChecked: "口服",
  formChecked: "片",
  intervalText: "30分钟",
  intervalSelected: "00:30",
  timeSelected: getCurrTime(false),
  startDateSelected: getCurrDate(),
  stopDateSelected: getCurrDate(),
});

function onDoseChange(e) {
  state.doseChecked = state.dose[e.detail.value];
  // console.log(state.doseChecked);
}

function onFormChange(e) {
  state.formChecked = state.form[e.detail.value];
  // console.log(state.formChecked);
}

function onTimeChange(e) {
  state.timeSelected = e.detail.value;
  // console.log(state.timeSelected);
}

function onStartDateChange(e) {
  state.startDateSelected = e.detail.value;
  // console.log(state.startDateSelected);
}

function onIntervalChange(e) {
  // e.detail.value = "00:30"
  // turn it into '30 minutes'
  let hour = e.detail.value.split(":")[0];
  let minute = e.detail.value.split(":")[1];
  let interval = "";
  // get rid of 0 in front of hour and minute
  if (hour[0] == "0") {
    hour = hour[1];
  }
  if (hour != "0") {
    interval += `${hour}小时`;
  }
  if (minute[0] == "0") {
    minute = minute[1];
  }
  interval += `${minute}分钟`;
  state.intervalText = interval;
}

function onDrugNameChange(e) {
  state.drugName = e;
  // console.log(state.drugName);
}

function onStopDateChange(e) {
  state.stopDateSelected = e.detail.value;
  // console.log(state.stopDateSelected);
}

function onDosageChange(e) {
  state.dosage = e;
  // console.log(state.dosage);
}

function addDrug(params) {
  let drug = new DrugData(
    Date.now(), // 唯一标识
    state.drugName, // 药品名称
    state.dosage, // 给药剂量
    state.formChecked, // 药物剂型
    state.doseChecked, // 给药方式
    state.intervalSelected, // 给药间隔
    state.timeSelected, // 初次给药
    state.startDateSelected, // 开始日期
    state.stopDateSelected // 结束日期
  );
  drugs.value.push(drug);
  console.log(drugs.value);
}
</script>
