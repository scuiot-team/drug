<template>
  <AtInput
    class="input"
    title="联系电话"
    type="nubmer"
    placeholder="请输入电话号码"
    :value="urgentPhone"
    :onChange="phoneInput.bind(this)"
  />
  <AtButton class="save" @click="save">保存</AtButton>
</template>

<script>
export default {
  name: "sosPage",
};
</script>

<script setup>
import "./sos.sass";
import Taro from "@tarojs/taro";
import { useDidShow } from "@tarojs/taro";
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";
import { ref } from "vue";

let urgentPhone = ref(getGlobalData("userInfo").urgentPhone);
function phoneInput(e) {
  console.log(e);
  urgentPhone.value = e;
}
function save() {
  if (urgentPhone.value) {
    console.log("save");
    let userInfo = getGlobalData("userInfo");
    userInfo.urgentPhone = urgentPhone.value;
    setGlobalData("userInfo", userInfo);
    Taro.showToast({
      title: "设置成功",
      icon: "success",
      duration: 1000,
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 1000);
  } else {
    Taro.showToast({
      title: "请完善信息",
      icon: "error",
      duration: 1000,
    });
  }
}
</script>

