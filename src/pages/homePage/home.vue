<template>
  This is home page
  <view>
    <AtButton type="secondary" @click="(e) => handleClick('secondary')">
      事件传参
    </AtButton>
    <AtButton loading type="primary" @click="handleClick.bind(this, 'primary')">
      事件传参
    </AtButton>

    <AtList>
      <AtListItem title="标题文字" @click="handleClick" />
      <AtListItem title="标题文字" arrow="right" />
      <AtListItem title="标题文字" extraText="详细信息" />
      <AtListItem title="禁用状态" disabled extraText="详细信息" />
    </AtList>
    <AtList>
      <AtListItem
        title="标题文字"
        note="描述信息"
        arrow="right"
        :iconInfo="{ size: 25, color: '#78A4FA', value: 'calendar' }"
      />
      <AtListItem
        title="标题文字"
        note="描述信息"
        extraText="详细信息"
        arrow="right"
        :iconInfo="{ size: 25, color: '#FF4949', value: 'bookmark' }"
      />
    </AtList>
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
import Taro from "@tarojs/taro";
// 引用全局变量 https://nervjs.github.io/taro-docs/docs/best-practice#全局变量
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";

export default {
  name: "homePage",
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
