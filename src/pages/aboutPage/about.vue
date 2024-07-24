<template>
  <scroll-view class="root" scroll-y>
    <View class="headline">关于「药白慧」</View>
    <View class="content">
      <View class="text">
        欢迎使用我们的智能药箱小程序——“药白慧”！
        我们致力于为用户提供便捷、智能的用药管理服务，帮助您和您的家人更好地管理药物、监测健康状况。
      </View>
    </View>
    <View class="panel-title">版本信息</View>
    <View class="content">
      <View class="text">当前版本：v1.0.0</View>
      <View class="text">发布时间：2024年7月</View>
    </View>
    <View class="panel-title">开发团队</View>
    <View class="content">
      <View class="text" style="font-weight: bold">医心二意队</View>
      <View class="text">
        团队成员拥有丰富的软件开发和医疗领域经验，致力于为您提供最好的用户体验和最优质的服务。
      </View>
    </View>
    <View class="panel-title">联系我们</View>
    <View class="content">
      <View class="text">
        如果您有任何建议、意见或问题，欢迎随时联系我们。您可以通过以下方式与我们取得联系：
      </View>

      <ul class="content">
        <li>
          <View class="text">· 邮件：</View>
          <View class="link">2694536263@qq.com</View>
        </li>
        <li>
          <View class="text">· 电话：</View>
          <View class="link">15888888888</View>
        </li>
        <li>
          <View class="text">· 地址：</View>
          <View class="link">四川大学江安校区</View>
        </li>
      </ul>
    </View>
    <View class="panel-title">隐私政策</View>
    <View class="content">
      <View class="text">
        我们非常重视用户的隐私和数据安全。在使用“药白慧”小程序的过程中，我们会严格遵守相关隐私法规，并采取各种措施保护您的个人信息。您可以在设置页面查看我们的隐私政策，了解我们如何收集、使用和保护您的数据。
      </View>
    </View>
    <View class="content">
      <View class="text">
        感谢您选择“药白慧”！希望我们的小程序能为您带来便利和帮助。祝您健康快乐！
      </View>
    </View>
  </scroll-view>
</template>


<script>
import "./about.sass";
import Taro from "@tarojs/taro";
// 引用全局变量 https://nervjs.github.io/taro-docs/docs/best-practice#全局变量
import { setGlobalData, getGlobalData } from "../../utils/global_data";

export default {
  name: "aboutPage",
};
</script>
