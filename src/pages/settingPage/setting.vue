<template>
  <AtList class="menu" :hasBorder="false">
    <AtListItem
      class="item"
      v-for="(item, index) in list"
      :key="index"
      :title="item.title"
      arrow="right"
      @click="navigateTo(item.url)"
    />
  </AtList>
  <AtButton v-if="isLogin" class="logout" @click="logout">退出登录</AtButton>
</template>


<script>
export default {
  name: "settingPage",
};
</script>

<script setup>
import "./setting.sass";
import Taro from "@tarojs/taro";
import { useDidShow } from "@tarojs/taro";
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";
import { ref } from "vue";

let list = [
  { title: "个人信息", url: "/pages/selfInfoPage/selfInfo" },
  { title: "用户协议", url: "/pages/articlePage/article?title=用户协议" },
  { title: "隐私政策", url: "/pages/articlePage/article?title=隐私政策" },
];

let isLogin = ref(getGlobalData("userInfo").isLogin);
// 更新页面数据
useDidShow((e) => {
  isLogin.value = getGlobalData("userInfo").isLogin;
});

function navigateTo(url) {
  // 检查是否登录，未登录无法查看个人信息
  if (!isLogin.value && url == "/pages/selfInfoPage/selfInfo") {
    Taro.showModal({
      title: "未登录",
      content: "登录后解锁",
      confirmText: "去登录",
      success: (res) => {
        if (res.confirm) {
          // 跳转至登录界面
          Taro.navigateTo({ url: "/pages/loginPage/login" });
        }
      },
    });
  } else {
    Taro.navigateTo({
      url: url,
    });
  }
}

function logout(e) {
  console.log("logout");
}
</script>

