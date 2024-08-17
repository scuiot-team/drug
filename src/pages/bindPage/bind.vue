<template>
  <view class="root-bind">
    <!-- <view class="success-text" v-if="!state.loading">
      绑定成功：{{ state.result }}
    </view> -->
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
import { ref, reactive } from "vue";
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
  result: "",
  loading: ref(false),
});

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
          console.log(data);
          state.result = data.result;
          // 扫码成功以后跳到签到成功页面、释放加载按钮
          state.loading = false;
          Taro.hideLoading();
          // 如果之前绑定过药箱，取消订阅
          let old_box_id = getGlobalData("box_id");
          if (old_box_id) {
            unsubscribeDrugTopics(old_box_id);
            setGlobalData("subscribed", false);
          }
          // 订阅新药箱
          setGlobalData("box_id", data.result);
          subscribeToDrugTopics(data.result);
          Taro.showToast({
            title: "成功绑定到药箱",
            icon: "success",
            duration: 2000,
          });
          setTimeout(() => {
            Taro.navigateBack();
          }, 1000);
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

onScanFunc();
</script>

