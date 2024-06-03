<template>
  <view class="headline">主页</view>
  <view class="health-info-cards">
    <view class="card-container">
      <AtCard
        note="1天前"
        extra="2024/12/12"
        title="血压"
        :thumb="bloodPressureUrl"
      >
        这也是内容区 可以随意定义功能, 我想要加一些图表什么的
      </AtCard>
    </view>
    <view class="card-container">
      <AtCard note="1天前" extra="2024/12/12" title="体重" :thumb="weightUrl">
        这也是内容区 可以随意定义功能, 我想要加一些图表什么的
      </AtCard>
    </view>
    <view class="card-container">
      <AtCard
        note="1天前"
        extra="2024/12/12"
        title="心率"
        :thumb="heartrateUrl"
      >
        这也是内容区 可以随意定义功能, 我想要加一些图表什么的
      </AtCard>
    </view>
    <view class="card-container">
      <AtCard
        note="1天前"
        extra="2024/12/12"
        title="血氧饱和度"
        :thumb="paO2Url"
      >
        这也是内容区 可以随意定义功能, 我想要加一些图表什么的
      </AtCard>
    </view>
    <view class="card-container">
      <AtCard
        note="1天前"
        extra="2024/12/12"
        title="血糖"
        :thumb="bloodGlucoseUrl"
      >
        这也是内容区 可以随意定义功能, 我想要加一些图表什么的
      </AtCard>
    </view>
  </view>
  <view>
    <AtTabBar
      fixed
      :tabList="tabList"
      @click="handleClickTabList"
      :current="0"
    />
  </view>
</template>


<script>
import "./home.sass"; // 引入样式
import Taro from "@tarojs/taro";
// 引用全局变量 https://nervjs.github.io/taro-docs/docs/best-practice#全局变量
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";
// Taro 中引用静态资源必须先 import 进来
// https://blog.csdn.net/laishaojiang/article/details/109111562
// https://docs.taro.zone/docs/static-reference/
import bloodPressureUrl from "../../images/icons/bloodPressure.svg";
import bloodGlucoseUrl from "../../images/icons/bloodGlucose.svg";
import weightUrl from "../../images/icons/weight.svg";
import heartrateUrl from "../../images/icons/heartrate.svg";
import paO2Url from "../../images/icons/paO2.svg";

export default {
  name: "homePage",
  data() {
    return {
      tabList: getGlobalData("tabList"),
      bloodPressureUrl: bloodPressureUrl,
      bloodGlucoseUrl: bloodGlucoseUrl,
      weightUrl: weightUrl,
      heartrateUrl: heartrateUrl,
      paO2Url: paO2Url,
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
