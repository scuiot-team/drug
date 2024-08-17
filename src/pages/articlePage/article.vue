<template>
  <scroll-view class="root-article" scroll-y>
    <view v-if="title === '用户协议'">
      <view class="headline"> 用户协议 </view>
    </view>
    <view v-else-if="title === '隐私政策'">
      <view class="headline">智能药箱隐私政策</view>
      <view class="content">
        <view class="text">
          感谢您使用“药白慧”小程序。我们非常重视您的隐私和个人信息保护。本隐私政策旨在帮助您了解我们如何收集、使用、披露、存储和保护您的信息。请在使用我们的服务之前，仔细阅读以下内容。
        </view>
      </view>
      <view class="panel-title">一、我们收集的信息</view>
      <view class="content">
        <view class="text">
          <view>1. <view style="font-weight: bold">您提供的信息</view></view>
          <ul class="content">
            <li>
              <view class="text">
                <view style="font-weight: bold">· 注册信息</view>
                您在注册和使用我们的服务时提供的个人信息，包括但不限于您的姓名、昵称、手机号码等。
              </view>
            </li>
            <li>
              <view class="text">
                <view style="font-weight: bold">· 健康信息</view>
                您在使用智能药箱记录药物使用情况、用药计划、您的健康状况等相关信息。
              </view>
            </li>
          </ul>
        </view>
        <view class="text">
          <view>2. <view style="font-weight: bold">自动收集的信息</view></view>
          <ul class="content">
            <li>
              <view class="text">
                <view style="font-weight: bold">· 设备信息</view>
                微信可能会收集您的设备信息，包括设备型号、操作系统、微信版本等。
              </view>
            </li>
            <li>
              <view class="text">
                <view style="font-weight: bold">· 日志信息</view>
                微信服务器会自动记录您使用小程序的详细信息，例如IP地址、浏览器类型、访问时间和页面浏览记录等。
              </view>
            </li>
          </ul>
        </view>
        <view class="text">
          <view>
            3. <view style="font-weight: bold">来自第三方的信息</view>
          </view>
        </view>
        <view class="content">
          <view class="text"> 我们不会从第三方获取您的信息。 </view>
        </view>
      </view>
      <view class="panel-title">二、我们如何使用信息</view>
      <view class="content">
        <view class="text">
          <ul>
            <li>
              <view class="text">
                · 提供和维护我们的服务:
                包括用户认证、处理您的请求、提供客户支持等。
              </view>
            </li>
            <li>
              <view class="text">
                · 改善我们的服务:
                我们会根据收集的信息进行数据分析，以提升我们的服务质量。
              </view>
            </li>
          </ul>
        </view>
      </view>
      <view class="panel-title">三、信息的分享与披露</view>
      <view class="content">
        <view class="text">
          <view style="font-weight: bold">与服务提供商</view>
          我们可能会与帮助我们运营、维护和改善服务的第三方服务提供商共享您的信息，但这些服务提供商无权将您的信息用于其他目的。
        </view>
      </view>
      <view class="panel-title">四、信息的存储和保护</view>
      <view class="content">
        <view class="text">
          <ul>
            <li>
              <view class="text">
                <view style="font-weight: bold">· 信息的存储</view>
                由于我们不采用后端服务器存储信息，您的信息主要存储在您的设备上，并通过MQTT协议进行传输。
              </view>
            </li>
            <li>
              <view class="text">
                <view style="font-weight: bold">· 信息的安全</view>
                我们采用各种安全技术和加密方式来保护您的信息免遭未经授权的访问、使用或披露。
              </view>
            </li>
          </ul>
        </view>
      </view>

      <view class="panel-title">五、您的权利</view>
      <view class="content">
        <view class="text">
          <view style="font-weight: bold">访问和更新信息</view>
          您有权访问和更新您的个人信息。您可以通过小程序内的相关功能进行修改。
        </view>
      </view>

      <view class="content">
        <view class="text"> 感谢您对“药白慧”的信任与支持！ </view>
        <view class="text"> （本隐私政策最后更新于2024年7月24日） </view>
      </view>
    </view>
  </scroll-view>
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

let title = ref("");

// 接收页面传参
useLoad((o) => {
  title.value = o.title;
});
</script>

