<template>
  <View>
    <View class="headline">{{ paraTitle }}</View>
    <AtFab class="add-record-btn" :onClick="addRecord">
      <Text className="at-fab__icon at-icon at-icon-add"></Text>
    </AtFab>
    <View class="bar-chart">
      <EChart ref="canvas" canvas-id="bar-canvas" />
    </View>
  </View>
</template>

<script>
export default {
  // 血压页面
  name: "para2Page",
};
</script>

<script setup>
import Taro from "@tarojs/taro";
import "./para2.sass";
import { EChart } from "echarts4taro3";
import { onMounted, ref } from "vue";
import { setGlobalData, getGlobalData } from "../../utils/global_data";

const canvas = ref(null);
// 获取页面传入的参数
const params = Taro.getCurrentInstance().router.params;
// 获取健康指标名称
let paraTitle = params["title"];
let paraName = params["name"];
// 获取健康指标数据
let paraData = getGlobalData("healthIndicators")[paraName];

function addRecord() {
  console.log("addRecord");
  Taro.navigateTo({
    url: `/pages/addRecord2Page/addRecord2?name=${paraName}&title=${paraTitle}`,
  });
}

onMounted(() => {
  const canvasInstance = canvas.value;
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      data: ["收缩压", "舒张压"],
    },
    xAxis: {
      name: "时\n间",
      type: "category",
      data: paraData.map((item) => item.date),
    },
    yAxis: {
      type: "value",
      name: "血压值",
    },
    series: [
      {
        name: "收缩压",
        data: paraData.map((item) => item.high),
        type: "line",
        smooth: true,
      },
      {
        name: "舒张压",
        data: paraData.map((item) => item.low),
        type: "line",
        smooth: true,
      },
    ],
  };
  Taro.nextTick(() => {
    canvasInstance.refresh(option);
  });
});
</script>
