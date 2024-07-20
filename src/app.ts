import { createApp } from 'vue';
import { createUI } from 'taro-ui-vue3';
import './app.scss';

var App = createApp({
  onShow: function onShow(options) {
    console.log('App launched Successfully. Here is the options:', options);
  } // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

// 引用全部组件
var tuv3 = createUI();
App.use(tuv3);
export default App;

// Taro-UI 教程 https://taro-ui.jd.com/#/docs/introduction
// GitHub https://github.com/NervJS/taro-ui
// Taro 官方文档 https://taro-docs.jd.com/docs/
// 学习指南 https://github.com/NervJS/awesome-taro

// https://github.com/beezen/echarts4taro3
// 首先在全局 app.js 中统一加载 echarts 库，如果只有单个页面使用 echarts，则推荐在单个页面中加载
import * as echarts from "echarts4taro3/lib/assets/echarts";
// 如果只有单个页面使用 echarts，则推荐在单个页面中加载
import { loadEcharts } from "echarts4taro3";
// 首先使用 loadEcharts 方法加载Echart模块
loadEcharts(echarts);
