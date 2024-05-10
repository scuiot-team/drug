import { createApp } from 'vue'
import { createUI } from 'taro-ui-vue3'
import './app.scss'

const App = createApp({
  onShow (options) {
    console.log('App onShow.', options)
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

// 引用全部组件
const tuv3 = createUI()
App.use(tuv3)

export default App

// Taro-UI 教程 https://taro-ui.jd.com/#/docs/introduction
// GitHub https://github.com/NervJS/taro-ui
// Taro 官方文档 https://taro-docs.jd.com/docs/
// 学习指南 https://github.com/NervJS/awesome-taro
