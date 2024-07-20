<template>
  <head :title="title" is_back="true"></head>
</template>

<script>
export default {
  name: "articlePage",
};
</script>

<script setup>
import "./article.sass";
import { Taro, useLoad } from "@tarojs/taro";
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { ref } from "vue";

let title = ref("文本");
let text1 = "这是用户协议文本";
let text2 = "这是隐私政策文本";

// 接收页面传参
useLoad((o) => {
  title.value = o.title;
});
</script>

