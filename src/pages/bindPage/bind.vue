<template>
  <View class="root">
    <View class="success-text" v-if="!state.loading">
      绑定成功：{{ state.result }}
    </View>
  </View>
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

// // 允许从相机和相册扫码
// Taro.scanCode({
//   success: (res) => {
//     console.log(res);
//   },
// });

// // 只允许从相机扫码
// Taro.scanCode({
//   onlyFromCamera: true,
//   success: (res) => {
//     console.log(res);
//   },
// });

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

