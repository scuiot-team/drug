<template>
  <head title="个人信息" is_back="true"></head>
  <image src="https://zgsdwz.top/static/image/背景-橘.jpg" class="back"></image>
  <button
    class="avatar"
    open-type="chooseAvatar"
    :onChooseavatar="onChooseAvatar.bind(this)"
  >
    <image
      :src="userInfo.avatar"
      style="display: block; width: 100%; height: 100%"
    ></image>
  </button>
  <AtInput
    class="item"
    placeholderClass="placeholder"
    title="昵称"
    type="text"
    placeholder="请输入昵称"
    :value="userInfo.nickName"
    :onChange="nickNameInput.bind(this)"
  />
  <AtInput
    class="item"
    placeholderClass="placeholder"
    title="姓名"
    type="text"
    placeholder="请输入姓名"
    :value="userInfo.name"
    :onChange="nameInput.bind(this)"
  />
  <AtInput
    class="item"
    placeholderClass="placeholder"
    title="手机号"
    type="phone"
    placeholder="请输入手机号"
    :value="userInfo.phone"
    :onChange="phoneInput.bind(this)"
  />
</template>

<script>
export default {
  name: "selfInfoPage",
};
</script>

<script setup>
import { ref } from "vue";
import "./selfInfo.sass";
import Taro from "@tarojs/taro";
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";

let userInfo = ref(getGlobalData("userInfo"));
function nickNameInput(e) {
  userInfo.value.nickName = e;
}
function nameInput(e) {
  userInfo.value.name = e;
}
function phoneInput(e) {
  userInfo.value.phone = e;
}
function onChooseAvatar(e) {
  userInfo.value.avatar = e.detail.avatarUrl;
}
</script>
