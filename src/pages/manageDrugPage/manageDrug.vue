<template>
  <scroll-view class="root-managedrug" scroll-y>
    <view class="headline"> 药物管理 </view>
    <view class="panel">
      <view class="panel-title">服药计划</view>
      <!-- v-for drug in drugs: -->
      <AtList v-for="(drug, index) in state.drugs" :key="index">
        <AtSwipeAction
          autoClose
          :options="state.options"
          :onClick="onClickSwipe.bind(this, index)"
        >
          <AtListItem
            hasBorder
            class="normal"
            :title="drug.drugName"
            :extraText="`${drug.dosage} ${drug.form} ${drug.dose}`"
          />
        </AtSwipeAction>
      </AtList>
    </view>
    <view class="panel">
      <view class="panel-title">库存药物</view>
      <view v-if="state.drugStock.length === 0" class="empty">
        <image class="empty-img" src="../../images/icons/啥也没有.svg" />
        <view class="empty-text">药盒还没有库存哦～</view>
      </view>
      <!-- 用AtCard循环 -->
      <view v-else>
        <AtCard
          v-for="(drugInfo, index) in state.drugStock"
          :key="index"
          :title="drugInfo.name"
          :thumb="drugInfo.otc ? otcUrl : RxUrl"
          :extra="toDate(Number(drugInfo.time) * 1000) + '存入'"
        >
          <view>
            <view class="bold-text">用法用量</view> ：{{ drugInfo.use }}
          </view>
          <view>
            <view class="bold-text">功能主治</view> ：{{ drugInfo.func }}
          </view>
        </AtCard>
      </view>
    </view>
    <AtButton
      class="save-btn"
      type="primary"
      size="normal"
      :onClick="onConfirm"
    >
      确定
    </AtButton>
  </scroll-view>
</template>

<script>
export default {
  name: "manageDrugPage",
};
</script>

<script setup>
import Taro from "@tarojs/taro";
import "./manageDrug.sass";
// 要使 state 对象在组件中可用，需要使用 reactive 函数将其包装
import { reactive, ref } from "vue";
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { DrugInfo, DrugData } from "../../utils/drugData";
import otcUrl from "../../images/icons/OTC.svg";
import RxUrl from "../../images/icons/Rx.svg";

// // 获取页面传入的参数
// const params = Taro.getCurrentInstance().router.params;
// console.log(params);

// 本页面的一些变量
var state = reactive({
  // 获取药物列表
  drugs: ref(getGlobalData("drugs")),
  // 获取药物库存
  drugStock: ref(getGlobalData("drugStock")),
  // 按钮右滑操作
  options: [
    {
      text: "编辑",
      style: {
        backgroundColor: "#6190E8",
      },
    },
    {
      text: "删除",
      style: {
        backgroundColor: "#FF4949",
      },
    },
  ],
});

function showDrugInfo(index) {
  // 展示药物信息 TODO
}

function onConfirm() {
  // save data
  Taro.navigateBack();
}

function toDate(timestamp) {
  return new Date(timestamp).toLocaleDateString();
}

function onClickSwipe(index, params) {
  console.log(index, params);
  if (params.text === "删除") {
    Taro.showModal({
      title: "提示",
      content: "是否确认删除该药物？",
      confirmText: "确定",
      success: (res) => {
        if (res.confirm) {
          state.drugs.splice(index, 1);
        }
      },
    });
  } else if (params.text === "编辑") {
    // TODO: edit drug
    Taro.navigateTo({ url: `../editDrugPage/editDrug?index=${index}` });
    return;
  }
}
</script>
