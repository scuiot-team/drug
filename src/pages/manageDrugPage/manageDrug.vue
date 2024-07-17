<template>
  <View>
    <View class="headline"> 药物管理 </View>
    <View class="panel">
      <View class="panel-title">所有药物</View>
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
    </View>
    <View class="panel">
      <View class="panel-title">服药信息</View>
    </View>
    <AtButton
      class="save-btn"
      type="primary"
      size="normal"
      :onClick="onConfirm"
    >
      确定
    </AtButton>
  </View>
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
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";
import { getCurrDate, getCurrTime } from "../../utils/global_func";
import DrugData from "../../utils/drugData";

// 获取页面传入的参数
const params = Taro.getCurrentInstance().router.params;
console.log(params);

// 本页面的一些变量
var state = reactive({
  // 获取药物列表
  drugs: ref(getGlobalData("drugs")),
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

function showDrugInfo(index) {}

function onConfirm() {
  // save data
  Taro.navigateBack();
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
