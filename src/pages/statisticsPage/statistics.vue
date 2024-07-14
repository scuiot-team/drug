<template>
  <AtCalendar :currentDate="currDate" />
  <AtTabBar fixed :tabList="tabList" @click="switchTab" :current="1" />
</template>

<script>
export default {
  name: "statisticsPage",
};
</script>

<script setup>
import "./statistics.sass";
import Taro from "@tarojs/taro";
import { useDidShow } from "@tarojs/taro";
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";
import { ref } from "vue";
import { switchTab } from "../../utils/global_func";

// example: 2024/7/12
let currDate = ref(new Date().toLocaleDateString());
const tabList = getGlobalData("tabList");

function handleClick(value) {
  console.log(value);
}
</script>
