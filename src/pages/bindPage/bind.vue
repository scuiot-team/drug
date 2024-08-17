<template>
  <view class="root-bind">
    <view v-if="!state.isWeApp">
      <view class="headline">绑定药盒</view>
      <AtInput
        class="input"
        title="编号"
        type="text"
        placeholder="请输入药盒表面的编号"
        :value="state.box_id"
        :onChange="boxIdInput.bind(this)"
      />
      <AtButton type="primary" class="bind" :onClick="bindBoxId">
        绑定设备
      </AtButton>
    </view>
  </view>
</template>

<script>
export default {
  name: "sosPage",
};
</script>

<script setup>
import "./bind.sass";
import Taro from "@tarojs/taro";
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { reactive } from "vue";
import { subscribe, unsubscribe } from "../../utils/mqtt_req";

function subscribeToDrugTopics(box_id) {
  const topics = ["slip", "adddrug", "heartrate", "spo2"];
  topics.forEach((topic) => subscribe(`drug/${box_id}/${topic}`));
}

function unsubscribeDrugTopics(box_id) {
  const topics = ["slip", "adddrug", "heartrate", "spo2"];
  topics.forEach((topic) => unsubscribe(`drug/${box_id}/${topic}`));
}

var state = reactive({
  box_id: "",
  loading: false,
  isWeApp: Taro.getEnv() === Taro.ENV_TYPE.WEAPP,
});

function boxIdInput(e) {
  state.box_id = e;
}

function bindBoxId() {
  // 如果之前绑定过药盒，取消订阅
  let old_box_id = getGlobalData("box_id");
  if (old_box_id) {
    unsubscribeDrugTopics(old_box_id);
  }
  // 订阅新药盒
  setGlobalData("box_id", state.box_id);
  subscribeToDrugTopics(state.box_id);
  Taro.showToast({
    title: "成功绑定到药盒",
    icon: "success",
    duration: 2000,
  });
  setTimeout(() => {
    Taro.navigateBack();
  }, 1000);
}

function onScanFunc() {
  if (state.loading) {
    return; // 防止二次点击
  }
  state.loading = true;
  // 如果是小程序环境
  if (process.env.TARO_ENV === "weapp") {
    Taro.showLoading({
      title: "加载中",
    });
    // 小程序扫码
    Taro.scanCode({
      success: (data) => {
        if (data) {
          // 获取二维码中的参数，调后台接口
          console.log("QR Code:", data.result);
          state.box_id = data.result;
          // 扫码成功以后跳到签到成功页面、释放加载按钮
          state.loading = false;
          Taro.hideLoading();
          bindBoxId();
        }
      },
      fail: (err) => {
        // 扫码签到失败后跳转到失败页面、释放加载按钮
        state.loading = false;
        Taro.hideLoading();
        console.log("err:", err);
      },
    });
  }
}

if (state.isWeApp) {
  onScanFunc();
}
</script>

