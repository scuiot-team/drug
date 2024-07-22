<template>
  <view class="root">
    <text>你好</text>
  </view>
</template>


<script>
import "./about.sass";
import Taro from "@tarojs/taro";
// 引用全局变量 https://nervjs.github.io/taro-docs/docs/best-practice#全局变量
import { setGlobalData, getGlobalData } from "../../utils/global_data";

export default {
  name: "aboutPage",
};
</script>
