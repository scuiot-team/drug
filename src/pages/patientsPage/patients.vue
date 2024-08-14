<template>
  <View class="root-patients">
    <scroll-view class="scrollview" scroll-y>
      <View class="scrollbody">
        <View class="card" v-for="(item, index) in patients" :key="index">
          <AtAvatar
            class="avatar"
            :image="item.avatar"
            @click="navigateTo('/pages/patientInfoPage/patientInfo?id=', index)"
          ></AtAvatar>
          <View class="info">
            <text class="name">{{ item.name }}</text>
            <View class="icon-text">
              <image class="info-icon" :src="phoneIconUrl"></image>
              <text class="info-text">{{ item.phone }}</text>
            </View>
            <View class="icon-text">
              <image class="info-icon" :src="diseaseIconUrl"></image>
              <text class="info-text">{{ item.illness }}</text>
            </View>
            <View class="button-list">
              <AtIcon
                class="icon"
                value="user"
                color="#1E90FF"
                @click="
                  navigateTo('/pages/patientInfoPage/patientInfo?id=', index)
                "
              ></AtIcon>
              <AtIcon
                class="icon"
                value="trash"
                color="#CD2626"
                @click="deletePatient(index)"
              ></AtIcon>
              <AtIcon
                class="icon"
                value="settings"
                color="#363636"
                @click="
                  navigateTo(
                    '/pages/editPatientInfoPage/editPatientInfo?id=',
                    index
                  )
                "
              ></AtIcon>
            </View>
          </View>
        </View>
      </View>
    </scroll-view>
    <AtButton
      class="add"
      @click="navigateTo('/pages/editPatientInfoPage/editPatientInfo?id=', -1)"
    >
      添加监护患者
    </AtButton>
  </View>
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
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { ref } from "vue";
// 静态资源
import phoneIconUrl from "../../images/icons/拨号.svg";
import diseaseIconUrl from "../../images/icons/疾病.svg";

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

