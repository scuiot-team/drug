import Taro from "@tarojs/taro";
import { get as getGlobalData } from "./global_data";

export function getCurrTime() {
  var now = new Date();
  // 获取年、月、日
  var hours = String(now.getHours()).padStart(2, "0");
  var minutes = String(now.getMinutes()).padStart(2, "0");
  var formattedTime = hours + ":" + minutes;
  return formattedTime;
}

export function getCurrDate() {
  var now = new Date();
  // 获取时、分
  var year = now.getFullYear();
  var month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以要加1
  var day = String(now.getDate()).padStart(2, "0");
  var formattedTime = year + "-" + month + "-" + day;
  return formattedTime;
}

export function switchTab(value) {
  let tabList = getGlobalData("tabList");
  // 跳转到目的页面，在当前页面打开
  Taro.switchTab({
    url: tabList[value].url,
  });
}

