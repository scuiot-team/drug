<template>
  <View class="user">
    <AtAvatar
      :image="userInfo.avatar"
      circle
      @click="navigateTo('/pages/selfInfoPage/selfInfo')"
    >
    </AtAvatar>
    <Text class="nickName" @click="navigateTo('/pages/selfInfoPage/selfInfo')">
      {{ userInfo.nickName }}
    </Text>
    <AtIcon
      class="setting"
      value="settings"
      color="gray"
      @click="navigateTo('/pages/settingPage/setting')"
    ></AtIcon>
  </View>
  <AtList class="menu" :hasBorder="false">
    <AtListItem
      v-for="(item, index) in settingList"
      :key="index"
      :title="item.title"
      arrow="right"
      :thumb="item.icon"
      @click="navigateTo(item.url)"
    />
  </AtList>
  <!-- <image src='../../images/用户信息管理.png'></image>
  <image src='../../images/关于.png'></image> -->
  <AtButton
    class="login"
    v-if="!userInfo.isLogin"
    @click="navigateTo('/pages/loginPage/login')"
  >
    登录
  </AtButton>
  <AtTabBar fixed :tabList="tabList" @click="switchTab" :current="3" />
</template>

<script>
export default {
  name: "selfPage",
};
</script>

<script setup>
import "./self.sass";
import Taro from "@tarojs/taro";
import { useDidShow } from "@tarojs/taro";
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";
import { ref } from "vue"; // ref声明响应式数据
import { switchTab } from "../../utils/global_func";
// Taro 引用图片
import infoIconUrl from "../../images/用户信息管理.png";
import phoneIconUrl from "../../images/拨号.png";
import aboutIconUrl from "../../images/关于.png";

let userInfo = ref(getGlobalData("userInfo"));
const tabList = getGlobalData("tabList");

let settingList = [
  {
    title: "监护对象管理",
    url: "/pages/patientsPage/patients",
    icon: infoIconUrl,
  },
  {
    title: "紧急呼救号码管理",
    url: "/pages/sosPage/sos",
    icon: phoneIconUrl,
  },
  {
    title: "关于软件",
    url: "/pages/aboutPage/about",
    icon: aboutIconUrl,
  },
];
// 更新页面数据
useDidShow((e) => {
  userInfo.value = getGlobalData("userInfo");
});

function navigateTo(url, e) {
  Taro.navigateTo({ url: url });
}
</script>
