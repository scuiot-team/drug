import Taro from "@tarojs/taro";
import { getGlobalData } from "./global_data";

export function getCurrTime(sec: Boolean = false) {
  var now = new Date();
  // 获取年、月、日
  var hours = String(now.getHours()).padStart(2, "0");
  var minutes = String(now.getMinutes()).padStart(2, "0");
  var seconds = String(now.getSeconds()).padStart(2, "0");
  if (sec) { // 返回HH:MM:SS格式
    return `${hours}:${minutes}:${seconds}`
  }
  return `${hours}:${minutes}`;
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

export function genRandStr(length: number): string {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  return str;
}
