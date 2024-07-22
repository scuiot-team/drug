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
        title="收缩压"
        type="number"
        :placeholder="'请输入收缩压值(大的那个)'"
        :value="para1Value"
        :onChange="value1Input"
      />
      <AtInput
        name="value"
        title="舒张压"
        type="number"
        :placeholder="'请输入舒张压值(小的那个)'"
        :value="para2Value"
        :onChange="value2Input"
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
  name: "addRecord2Page",
};
</script>

<script setup>
import Taro from "@tarojs/taro";
import "./addRecord2.sass";
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
// 2个参数（舒张压、收缩压）
var para1Value = ref();
var para2Value = ref();

function timeInput(e) {
  // 绑定时间输入框
  console.log(e);
  currTime.value = e;
}

function value1Input(e) {
  // 绑定数值输入框
  console.log(e);
  para1Value.value = e;
}

function value2Input(e) {
  // 绑定数值输入框
  console.log(e);
  para2Value.value = e;
}

function saveRecord(params) {
  console.log("saveRecord");
  console.log("get time:", currTime.value);
  let healthIndicators = ref(getGlobalData("healthIndicators"));
  let currTimeSplit = currTime.value.split(" ");
  healthIndicators.value[paraName].push({
    date: currTimeSplit[0], // TODO: 用户填写不规范可能会出bug
    time: currTimeSplit[1],
    high: para1Value.value,
    low: para2Value.value,
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
