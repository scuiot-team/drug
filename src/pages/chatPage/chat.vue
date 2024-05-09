<template>
  <view class="container">
    <view class="fixed-top">
      <AtInput
        type="text"
        placeholder="您有什么问题?"
        :value="rawText"
        :onChange="onMsgChange.bind(this)"
        :onConfirm="onSendMsg"
      >
        <AtIcon
          value="check-circle"
          :color="iconDisabled ? '#969799' : '#5ea3ef'"
          @click="onSendMsg"
        ></AtIcon>
      </AtInput>
    </view>
    <view class="wechat-content">
      <view v-for="(item, index) in messages" :key="index">
        <view class="wechat-dialog" v-if="item.role === 'assistant'">
          <view class="wechat-dialog-face">
            <image src="../../images/gptAvatar.png" />
          </view>
          <view class="wechat-dialog-text">
            {{ item.content }}
          </view>
        </view>
        <view
          class="wechat-dialog wechat-dialog-right"
          v-else-if="item.role === 'user'"
        >
          <view class="wechat-dialog-face">
            <AtIcon value="user"></AtIcon>
          </view>
          <view class="wechat-dialog-text">
            {{ item.content }}
          </view>
        </view>
      </view>
      <view v-if="isLoading">
        <view class="wechat-dialog">
          <view class="wechat-dialog-face">
            <image src="../../images/gptAvatar.png" />
          </view>
          <view class="wechat-dialog-text">
            <view v-if="isResponding">
              {{ respondingText }}
            </view>
            <view v-else>
              <AtIcon value="loading-2"></AtIcon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <view>
    <AtTabBar
      fixed
      :tabList="tabList"
      @click="handleClickTabList"
      :current="2"
    />
  </view>
</template>


<script>
import "./chat.sass";
import Taro from "@tarojs/taro";
// 需要借助第三方库实现 ArrayBuffer 转换为字符串
import { TextEncoder } from "text-encoding-shim";
// 引用全局变量 https://nervjs.github.io/taro-docs/docs/best-practice#全局变量
import {
  set as setGlobalData,
  get as getGlobalData,
} from "../../utils/global_data";

export default {
  name: "chatPage",
  data() {
    return {
      tabList: getGlobalData("tabList"),
      rawText: "",
      isResponding: false,
      isLoading: false,
      respondingText: "",
      iconDisabled: true,
      messages: [
        {
          role: "system",
          content:`
你是一名用药助手，提供专业的用药咨询服务，旨在为用户提供他们想要知道的关于药品的一切信息。这包括药品的主要成分、功效、适用症、用法用量以及注意事项等。用药助手应该在用户提及自己的身体状况时主动分析其病症，并给出在非处方药范围内的用药建议，其余情况应建议用户及时就诊。此外，用药助手还能够在用户提供多个药品名称时，解释这些药品在适用症上的差异，并指导用户在特定情况下选择最合适的药物。你应该做到：
1. 提供药品的详细信息，包括成分、原理、功效、适用症等。
2. 解释多个药品在适用症上的差异。
3. 指导用户在特定情况下选择最合适的药物。
4. 提醒用户注意事项和用法用量。
你必须：
- 提供准确、可靠的药物信息。
- 在解释药物信息时，保持客观、科学的态度。
- 强调在使用任何药物前咨询专业医生的重要性。
- 保护用户隐私，不收集或分享用户的个人信息。`,
        },
        {
          role: "assistant",
          content: "您好！我是您的用药助手，有什么需要帮忙的吗？",
        },
      ],
    };
  },
  methods: {
    handleClickTabList(value) {
      // 跳转到目的页面，在当前页面打开
      Taro.switchTab({
        url: this.tabList[value].url,
      });
    },
    onMsgChange(text) {
      this.rawText = text;
      this.iconDisabled = text.trim() === "";
      console.log(this.iconDisabled);
      return text;
    },
    getRespFromAI(messages) {
      const that = this;
      try {
        // 创建与OpenAI的流式传输API的连接
        const url = "https://chat.fyscu.com/api/route";
        //直接获取 Fetch 的response， 无法使用 await的话， Promise的方式也是可以的。
        const requestTask = Taro.request({
          url: url,
          responseType: "arraybuffer",
          method: "POST",
          enableChunked: true,
          header: {
            "Content-Type": "application/json",
            // "Transfer-Encoding": 'chunked'
          },
          data: {
            apikey: process.env.OPENAI_API_KEY,
            model: "gpt-3.5-turbo",
            messages: messages,
          },
          success: (res) => {
            console.log("All data received successfully, result:", res);
          },
          fail: (err) => {
            console.log("Request failed", err);
          },
          complete: () => {
            const newMessage = {
              role: "assistant",
              content: that.respondingText,
            };

            that.respondingText = "";
            that.isResponding = false;
            that.isLoading = false;
            that.messages = that.messages.concat(newMessage);
          },
        });
        requestTask.onChunkReceived((res) => {
          // 方法1
          const arrayBuffer = res.data;
          const uint8Array = new Uint8Array(arrayBuffer);
          const text = new TextDecoder("utf-8").decode(uint8Array);

          // 方法2
          // const arrayBuffer = res.data;
          // const uint8Array = new Uint8Array(arrayBuffer);
          // let text = String.fromCharCode.apply(null, uint8Array);

          // 方法3
          // const data16 = that.buf2hex(res.data);
          // const text = that.hexToStr(data16);
          that.isResponding = true;
          that.respondingText = that.respondingText + text;
          // console.log(that.respondingText);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    },
    onSendMsg() {
      if (this.iconDisabled) {
        return;
      }
      // console.log(this.rawText);
      const newMessage = { role: "user", content: this.rawText };
      this.rawText = "";
      this.isLoading = true;
      this.messages = this.messages.concat(newMessage);
      this.iconDisabled = true;
      this.getRespFromAI(this.messages);
    },
  },
};
</script>
