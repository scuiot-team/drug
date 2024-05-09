<template>
  <view> This is dataa page </view>
  <view>
    <AtTabBar
      fixed
      :tabList="tabList"
      @click="handleClickTabList"
      :current="1"
    />
  </view>
</template>


<script>
import { AtInput, AtForm } from "taro-ui";
import Taro from "@tarojs/taro";
// 引用全局变量 https://nervjs.github.io/taro-docs/docs/best-practice#全局变量
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";

export default {
  name: "dataPage",
  data() {
    return {
      tabList: getGlobalData("tabList"),
    };
  },
  methods: {
    handleClickTabList(value) {
      // 跳转到目的页面，在当前页面打开
      Taro.switchTab({
        url: this.tabList[value].url,
      });
    },
    handleClick(value) {
      console.log(value);
    },
  },
};
</script>
