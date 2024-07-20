import mqtt from "./mqtt.min.js";
import { getGlobalData } from "./global_data";
import { genRandStr } from "./global_func.js";
import Taro from "@tarojs/taro";

let host = getGlobalData('MQTTurl');
let client: any = null; // 初始化MQTT client
const mqttOptions = {
  keepalive: 30,
  protocolVersion: 4, // MQTT V3.1.1
  connectTimeout: 4000,
  clientId: 'wechat_' + genRandStr(6),
  username: 'nanguagua',
  password: atob("RU1RWG5nZzEyMw=="),
  clean: true, // Clean session
};

export function connect() {
  // MQTT-WebSocket 统一使用 /path 作为连接路径，连接时需指明，但在 EMQX Cloud 部署上使用的路径为 /mqtt
  // 因此不要忘了带上这个 /mqtt !!!
  // 微信小程序中需要将 wss 协议写为 wxs，且由于微信小程序出于安全限制，不支持 ws 协议
  try {
    console.log("连接中...");
    client = mqtt.connect(`wxs://${host}:8084/mqtt`, mqttOptions);
    client.on("connect", () => {
      Taro.showToast({
        title: "连接成功",
      });
      console.log("链接成功");
      client.on("message", (topic: string, payload: string) => {
        payload = payload.toString();
        try {
          payload = JSON.parse(payload);
        } catch (error) {
          console.log("payload is not JSON");
        }
        // Taro.showModal({
        //   content: `收到消息 - Topic: ${topic}，Payload: ${payload}`,
        //   showCancel: false,
        // });
        console.log("recieve message:", payload, "from topic:", topic);
      });

      client.on("error", (error: any) => {
        console.log("onError:", error);
      });

      client.on("reconnect", () => {
        console.log("reconnecting...");
      });

      client.on("offline", () => {
        console.log("onOffline");
      });
      // 更多 MQTT.js 相关 API 请参阅 https://github.com/mqttjs/MQTT.js#api
    });
  } catch (error) {
    console.log("mqtt.connect error:", error);
  }
}

export function subscribe(subTopic: string) {
  if (client) {
    client.subscribe(subTopic);
    console.log(`成功订阅主题：${subTopic}`);
    // Taro.showModal({
    //   content: `成功订阅主题：${subTopic}`,
    //   showCancel: false,
    // });
    return;
  }
  console.log("Client is null");
}

export function unsubscribe(subTopic: string) {
  if (client) {
    client.unsubscribe(subTopic)
    Taro.showModal({
      content: `成功取消订阅主题：${subTopic}`,
      showCancel: false,
    });
    return;
  }
  console.log("Client is null");
}

export function publish(pubTopic: string, pubMsg: any) {
  if (client) {
    client.publish(pubTopic, pubMsg);
    return;
  }
  console.log("Client is null");
}
