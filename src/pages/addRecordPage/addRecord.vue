<template>
  <View class="root">
    <View class="headline"> 添加{{ paraTitle }}记录 </View>
    <AtForm>
      <AtInput
        title="时间"
        type="text"
        placeholder="时间"
        :value="currTime"
        :onChange="timeInput"
      />
      <AtInput
        name="value"
        title="数值"
        type="number"
        :placeholder="'请输入' + paraTitle + '值'"
        :value="paraValue"
        :onChange="valueInput"
      />
    </AtForm>
    <AtButton
      class="save-btn"
      type="primary"
      size="normal"
      :onClick="saveRecord"
    >
      保存
    </AtButton>
  </View>
</template>

<script>
export default {
  name: "addRecordPage",
};
</script>

<script setup>
import Taro from "@tarojs/taro";
import "./addRecord.sass";
import { onMounted, ref } from "vue";
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { getCurrTime, getCurrDate } from "../../utils/global_func";

// 获取页面传入的参数
const params = Taro.getCurrentInstance().router.params;
console.log(params);
// 获取健康指标名称
const paraTitle = params["title"];
const paraName = params["name"];
// 获取当前时间
var currTime = ref(`${getCurrDate()}T${getCurrTime()}`);
var paraValue = ref();

function timeInput(e) {
  // 绑定时间输入框
  console.log(e);
  currTime.value = e;
}

function valueInput(e) {
  // 绑定数值输入框
  console.log(e);
  paraValue.value = e;
}

function saveRecord(params) {
  console.log("saveRecord");
  console.log("get time:", currTime.value);
  console.log("get value:", paraValue.value);
  let healthIndicators = ref(getGlobalData("healthIndicators"));
  let currTimeSplit = currTime.value.split(" ");
  healthIndicators.value[paraName].push({
    date: currTimeSplit[0], // TODO: 用户填写不规范可能会出bug
    time: currTimeSplit[1],
    value: paraValue.value,
  });
  Taro.showToast({
    title: "保存成功",
    icon: "success",
    duration: 1000,
  });
  setTimeout(() => {
    Taro.navigateBack();
  }, 500);
}
</script>
