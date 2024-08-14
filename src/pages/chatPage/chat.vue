<template>
  <View class="root-chat">
    <View class="container">
      <View class="fixed-top">
        <AtInput
          type="text"
          placeholder="您有什么问题?"
          :value="state.rawText"
          :onChange="onMsgChange"
          :onConfirm="onSendMsg"
        >
          <AtIcon
            value="check-circle"
            :color="state.iconDisabled ? '#969799' : '#5ea3ef'"
            :onClick="onSendMsg"
          ></AtIcon>
        </AtInput>
      </View>
      <View class="wechat-content">
        <View v-for="(item, index) in state.messages" :key="index">
          <View class="wechat-dialog" v-if="item.role === 'assistant'">
            <View class="wechat-dialog-face">
              <AtAvatar class="avatar" :image="AiAvatar"></AtAvatar>
            </View>
            <View class="wechat-dialog-text">
              {{ item.content }}
            </View>
          </View>
          <View
            class="wechat-dialog wechat-dialog-right"
            v-else-if="item.role === 'user'"
          >
            <View class="wechat-dialog-face">
              <AtAvatar class="avatar" :image="userAvatarUrl"></AtAvatar>
            </View>
            <View class="wechat-dialog-text">
              {{ item.content }}
            </View>
          </View>
        </View>
        <View v-if="state.isLoading">
          <View class="wechat-dialog">
            <View class="wechat-dialog-face">
              <AtAvatar class="avatar" :image="AiAvatar"></AtAvatar>
            </View>
            <View class="wechat-dialog-text">
              <View v-if="state.isResponding">
                {{ state.respondingText }}
              </View>
              <View v-else>
                <!-- <AtLoadMore
                  :onClick="stopLoading"
                  status="loading"
                  loadingText="生成中"
                  noMoreText="。"
                /> -->
                <AtIcon class="loader" value="loading"></AtIcon>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
    <!-- 底栏 Tabbar -->
    <AtTabBar fixed :tabList="tabList" :onClick="switchTab" :current="2" />
  </View>
</template>

<script>
export default {
  name: "chatPage",
};
</script>

<script setup>
import "./chat.sass";
import Taro from "@tarojs/taro";
import AiAvatar from "../../images/icons/AiAvatar.svg";
// Instead: https://cdn.fyscu.com/otherImages/AiAvatar.svg
// 需要借助第三方库实现 ArrayBuffer 转换为字符串
import { TextDecoder } from "../../utils/text_encode_shim";
// 引用全局变量 https://nervjs.github.io/taro-docs/docs/best-practice#全局变量
import { setGlobalData, getGlobalData } from "../../utils/global_data";
import { reactive } from "vue";
import { switchTab } from "../../utils/global_func";

const tabList = getGlobalData("tabList");
const userAvatarUrl = getGlobalData("userInfo").avatar;

const state = reactive({
  rawText: "",
  isResponding: false,
  isLoading: false,
  respondingText: "",
  iconDisabled: true,
  messages: [
    {
      role: "system",
      content: `
现在你是一名资深医生，充当用药助手的角色，提供专业的用药咨询服务，旨在为用户提供他们想要知道的关于药品的一切信息。这包括药品的主要成分、功效、适用症、用法用量以及注意事项等。用药助手应该在用户提及自己的身体状况时主动分析其病症，并给出在非处方药范围内的用药建议，其余情况应建议用户及时就诊。此外，用药助手还能够在用户提供多个药品名称时，解释这些药品在适用症上的差异，并指导用户在特定情况下选择最合适的药物。你应该做到：
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
});

function onMsgChange(text) {
  state.rawText = text;
  state.iconDisabled = text.trim() === "";
  console.log(state.rawText, state.iconDisabled);
}

function getRespFromAI(mesg) {
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
        // apikey: process.env.OPENAI_API_KEY,
        model: "gpt-4o-mini",
        messages: mesg,
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
          content: state.respondingText,
        };

        state.respondingText = "";
        state.isResponding = false;
        state.isLoading = false;
        state.messages = state.messages.concat(newMessage);
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
      // const data16 = buf2hex(res.data);
      // const text = hexToStr(data16);
      state.isResponding = true;
      state.respondingText += text;
      // console.log(state.respondingText);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

function onSendMsg() {
  if (state.iconDisabled) {
    return;
  }
  // console.log(state.rawText);
  const newMessage = { role: "user", content: state.rawText };
  state.rawText = "";
  state.isLoading = true;
  state.messages = state.messages.concat(newMessage);
  state.iconDisabled = true;
  getRespFromAI(state.messages);
}

function stopLoading() {
  state.isLoading = false;
}
</script>
