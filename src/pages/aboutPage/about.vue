<template>
  <scroll-view class="root-about" scroll-y>
    <view class="headline">关于「药白慧」</view>
    <view class="text">
      欢迎使用我们的智能药箱小程序——“药白慧”！
      我们致力于为用户提供便捷、智能的用药管理服务，帮助您和您的家人更好地管理药物、监测健康状况。
    </view>
    <view class="panel-title">版本信息</view>
    <view class="text">当前版本：v1.0.0</view>
    <view class="text">发布时间：2024年7月</view>
    <view class="panel-title">开发团队</view>
    <view class="text" style="font-weight: bold">医心二意队</view>
    <view class="text">
      团队成员拥有丰富的软件开发和医疗领域经验，致力于为您提供最好的用户体验和最优质的服务。
    </view>
    <view class="panel-title">联系我们</view>
    <view class="text">
      如果您有任何建议、意见或问题，欢迎随时联系我们。您可以通过以下方式与我们取得联系：
    </view>

    <ul class="content">
      <li>
        <view class="text">❯ 邮件：</view>
        <view class="link">2694536263@qq.com</view>
      </li>
      <li>
        <view class="text">❯ 电话：</view>
        <view class="link">15888888888</view>
      </li>
      <li>
        <view class="text">❯ 地址：</view>
        <view class="link">四川大学江安校区</view>
      </li>
    </ul>
    <view class="panel-title">隐私政策</view>
    <view class="text">
      我们非常重视用户的隐私和数据安全。在使用“药白慧”小程序的过程中，我们会严格遵守相关隐私法规，并采取各种措施保护您的个人信息。您可以在设置页面查看我们的隐私政策，了解我们如何收集、使用和保护您的数据。
    </view>
    <view class="text">
      感谢您选择“药白慧”！希望我们的小程序能为您带来便利和帮助。祝您健康快乐！
    </view>
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
