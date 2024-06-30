<template>
  <scroll-view class="scrollview" scroll-y="true">
    <view class="scrollbody">
      <view class="card" v-for="(item, index) in patients" :key="index">
        <AtAvatar
          class="avatar"
          :image="item.avatar"
          @click="navigateTo('/pages/patientInfoPage/patientInfo?id=', index)"
        ></AtAvatar>
        <view class="info">
          <text class="name">{{ item.name }}</text>
          <view class="icon-text">
            <image
              src="../../images/拨号.png"
              style="width: 40rpx; height: 40rpx; margin-right: 10rpx"
            ></image>
            <text>{{ item.phone }}</text>
          </view>
          <view class="icon-text">
            <image
              src="../../images/慢性病.png"
              style="width: 40rpx; height: 40rpx; margin-right: 10rpx"
            ></image>
            <text>{{ item.illness }}</text>
          </view>
          <AtIcon
            class="icon"
            value="user"
            color="#1E90FF"
            style="right: 170rpx"
            @click="navigateTo('/pages/patientInfoPage/patientInfo?id=', index)"
          ></AtIcon>
          <AtIcon
            class="icon"
            value="trash"
            color="#CD2626"
            style="right: 100rpx"
            @click="deletePatient(index)"
          ></AtIcon>
          <AtIcon
            class="icon"
            value="settings"
            color="#363636"
            style="right: 30rpx"
            @click="
              navigateTo(
                '/pages/editPatientInfoPage/editPatientInfo?id=',
                index
              )
            "
          ></AtIcon>
        </view>
      </view>
    </view>
  </scroll-view>
  <AtButton
    class="add"
    @click="navigateTo('/pages/editPatientInfoPage/editPatientInfo?id=', -1)"
    >添加监护患者</AtButton
  >
</template>


<script>
export default {
  name: "patientsPage",
};
</script>

<script setup>
import "./patients.sass";
import Taro from "@tarojs/taro";
import { useDidShow } from "@tarojs/taro";
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";
import { ref } from "vue";

let patients = ref(getGlobalData("patients"));
let isLogin = getGlobalData("userInfo").isLogin;
// 更新页面数据
useDidShow((e) => {
  isLogin = getGlobalData("userInfo").isLogin;
  patients.value = getGlobalData("patients");
});
function navigateTo(url, params) {
  // 检查是否登录
  if (isLogin) {
    Taro.navigateTo({
      url: url + params,
    });
  } else {
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
  }
}
function deletePatient(e) {
  Taro.showModal({
    title: "提示",
    content: "您确定要删除该监护对象吗？",
    success: (res) => {
      if (res.confirm) {
        // 从对象数组中删除该对象
        patients.value.splice(e, 1);
      }
    },
  });
}
</script>

