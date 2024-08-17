import mqtt from "./mqtt.min.js";
import { ref } from "vue";
import { DrugInfo } from "./drugData";
import { getGlobalData, setGlobalData } from "./global_data";
import { genRandStr, getTime, getDate } from "./global_func";
import Taro from "@tarojs/taro";

let host = getGlobalData('MQTTurl');
let drugStock = ref(getGlobalData('drugStock'));
let healthIndicators = ref(getGlobalData('healthIndicators'));
let client: any = null; // 初始化MQTT client

const mqttOptions = {
  keepalive: 10,
  protocolVersion: 4, // MQTT V3.1.1
  connectTimeout: 4000,
  clientId: 'wechat_' + genRandStr(6),
  username: 'nanguagua',
  // password: atob("RU1RWG5nZzEyMw=="), // 我靠，这个atob会导致真机预览和真机调试失败白屏！！！
  password: 'EMQXngg123',
  clean: true, // Clean session
};

export function connect() {
  // MQTT-WebSocket 统一使用 /path 作为连接路径，连接时需指明，但在 EMQX Cloud 部署上使用的路径为 /mqtt
  // 因此不要忘了带上这个 /mqtt !!!
  // 微信小程序中需要将 wss 协议写为 wxs，且由于微信小程序出于安全限制，不支持 ws 协议
  try {
    if (getGlobalData('mqttConnected')) {
      console.log("MQTT已连接");
      return;
    }
    console.log("连接中...");
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
      console.log("this is weapp");
      client = mqtt.connect(`wxs://${host}:8084/mqtt`, mqttOptions);
    } else {
      console.log("this is not weapp");
      client = mqtt.connect(`wss://${host}:8084/mqtt`, mqttOptions);
    }
    client.on("connect", () => {
      console.log("成功链接到MQTT服务器");
      setGlobalData('mqttConnected', true);
      let box_id = getGlobalData('box_id');
      if (!box_id) {
        console.log("未绑定药盒");
        Taro.showModal({
          content: "监测到还未绑定药盒，请到设置里绑定！",
          showCancel: false,
        });
      }
      client.on("message", (topic: string, payload: string | any) => {
        box_id = getGlobalData('box_id'); // 更新药盒ID
        payload = payload.toString();
        try {
          payload = JSON.parse(payload);
        } catch (error) {
          console.log("payload is not JSON");
          return;
        }
        console.log("recieve message:", payload, "from topic:", topic);
        if (topic === `drug/${box_id}/slip`) {
          if (payload.code === 400) {
            Taro.showModal({
              content: payload.message,
              showCancel: false,
            });
          }
        }
        if (topic === `drug/${box_id}/adddrug`) {
          if (payload.code === 200) {
            let druginfo = payload.druginfo;
            if (druginfo) {
              drugStock.value.push(new DrugInfo(
                String(payload.timestamp),
                druginfo.name,  // 药品名称
                druginfo.use,   // 用法用量
                druginfo.func,  // 功能主治
                druginfo.otc,   // 是否OTC
              ));
              Taro.showModal({
                content: `${payload.message}：${payload.druginfo.name}`,
                showCancel: false,
              });
            }
          }
        }
        if (topic === `drug/${box_id}/heartrate`) {
          payload.timestamp = payload.timestamp * 1000;
          if (payload.code === 200) {
            healthIndicators.value.heartRateData.push({
              date: getDate(payload.timestamp),
              time: getTime(payload.timestamp),
              value: payload.heartrate,
            })
            console.log("heartrate:", healthIndicators.value.heartRateData);
            Taro.showModal({
              content: `${payload.message}：${payload.heartrate}`,
              showCancel: false,
            });
          }
        }
        if (topic === `drug/${box_id}/spo2`) {
          payload.timestamp = payload.timestamp * 1000;
          if (payload.code === 200) {
            healthIndicators.value.bloodOxygenData.push({
              date: getDate(payload.timestamp),
              time: getTime(payload.timestamp),
              value: payload.spo2,
            })
            console.log("spo2:", healthIndicators.value.bloodOxygenData);
            Taro.showModal({
              content: `${payload.message}：${payload.spo2}`,
              showCancel: false,
            });
          }
        }
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
    return;
  }
  console.log("Client is null");
}

export function unsubscribe(subTopic: string) {
  if (client) {
    client.unsubscribe(subTopic);
    console.log(`取消订阅主题：${subTopic}`);
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
