import PatientInfo from "./patientInfo"
import DrugData from "./drugData";

const globalData = {
  // 底部Tab栏
  tabList: [
    { url: "/pages/homePage/home", title: "首页", iconType: "home" },
    { url: "/pages/statisticsPage/statistics", title: "统计", iconType: "bullet-list" },
    { url: "/pages/chatPage/chat", title: "问AI", iconType: "message" },
    { url: "/pages/selfPage/self", title: "我的", iconType: "user", max: 99 },
  ],
  // 用户信息
  userInfo: {
    isLogin: true,
    account: '',
    password: '',
    avatar: 'https://img2.baidu.com/it/u=18303046,1217185652&fm=253&fmt=auto&app=138&f=JPEG?w=502&h=500',
    nickName: '小马哥',
    urgentPhone: ''
  },
  patients: [
    new PatientInfo(
      '小明', 66, '男', '19434636375', 'https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280', '子女', '高血压', '否', '暂无', '良好', 170, 60, 100, 2.6, 100, 70, '胰岛素增敏剂'
    ),
    new PatientInfo(
      '老明', 90, '男', '19436563675', 'https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280', '子孙', '糖尿病', '否', '暂无', '良好', 162, 52, 100, 2.6, 100, 73, '胰岛素增敏剂'
    ),
  ],
  // 用药记录
  drugRecord: [
    { name: '阿司匹林', date: '2024-10-01', time: '08:00', dosage: '1', form: '片' },
    { name: '阿奇霉素', date: '2024-10-01', time: '10:00', dosage: '1', form: '片' },
  ],
  // 药物数据
  drugs: [
    // 阿司匹林 每隔12小时1片，从 2024-10-01 08:00 起，至 2024-10-10 结束
    new DrugData('阿司匹林', '1', '片', '口服', '12:00', '08:00', '2024-07-11', '2024-10-10'),
    new DrugData('山莨菪碱', '1', '片', '口服', '17:00', '08:00', '2024-07-11', '2024-10-10'),
    new DrugData('毛果芸香碱', '1', '片', '滴眼', '06:00', '08:00', '2024-07-11', '2024-10-10'),
    new DrugData('阿托品', '2', '片', '口服', '03:30', '08:00', '2024-07-11', '2024-10-10'),
    new DrugData('胰岛素', '1', '片', '静脉注射', '24:00', '08:00', '2024-07-11', '2024-10-10'),
  ],
  // 健康指标
  healthIndicators: {
    bloodPressureData: [
      { time: '2024-10-01 08:00', high: 120, low: 80 },
      { time: '2024-10-02 08:00', high: 130, low: 90 },
      { time: '2024-10-03 08:00', high: 140, low: 100 },
      { time: '2024-10-04 08:00', high: 150, low: 110 },
      { time: '2024-10-05 08:00', high: 160, low: 120 },
      { time: '2024-10-06 08:00', high: 170, low: 130 },
      { time: '2024-10-07 08:00', high: 180, low: 140 },
      { time: '2024-10-08 08:00', high: 190, low: 150 },
      { time: '2024-10-09 08:00', high: 200, low: 160 },
      { time: '2024-10-10 08:00', high: 210, low: 170 },
    ],
    weightData: [
      { time: '2024-10-01 08:00', value: 60 },
      { time: '2024-10-02 08:00', value: 61 },
      { time: '2024-10-03 08:00', value: 62 },
      { time: '2024-10-04 08:00', value: 63 },
      { time: '2024-10-05 08:00', value: 64 },
      { time: '2024-10-06 08:00', value: 65 },
      { time: '2024-10-07 08:00', value: 66 },
      { time: '2024-10-08 08:00', value: 67 },
      { time: '2024-10-09 08:00', value: 68 },
      { time: '2024-10-10 08:00', value: 69 },
      { time: '2024-10-11 08:00', value: 69 },
      { time: '2024-10-12 08:00', value: 68 },
      { time: '2024-10-13 08:00', value: 68 },
    ],
    heartRateData: [
      { time: '2024-10-01 08:00', value: 70 },
      { time: '2024-10-02 08:00', value: 71 },
      { time: '2024-10-03 08:00', value: 72 },
      { time: '2024-10-04 08:00', value: 73 },
      { time: '2024-10-05 08:00', value: 74 },
      { time: '2024-10-06 08:00', value: 75 },
      { time: '2024-10-07 08:00', value: 76 },
      { time: '2024-10-08 08:00', value: 77 },
      { time: '2024-10-09 08:00', value: 78 },
      { time: '2024-10-10 08:00', value: 79 },
      { time: '2024-10-11 08:00', value: 79 },
      { time: '2024-10-12 08:00', value: 78 },
      { time: '2024-10-13 08:00', value: 78 },
    ],
    bloodOxygenData: [
      { time: '2024-10-01 08:00', value: 98 },
      { time: '2024-10-02 08:00', value: 98 },
      { time: '2024-10-03 08:00', value: 99 },
      { time: '2024-10-04 08:00', value: 98 },
      { time: '2024-10-05 08:00', value: 98 },
      { time: '2024-10-06 08:00', value: 99 },
      { time: '2024-10-07 08:00', value: 98 },
      { time: '2024-10-08 08:00', value: 98 },
      { time: '2024-10-09 08:00', value: 99 },
      { time: '2024-10-10 08:00', value: 98 },
      { time: '2024-10-11 08:00', value: 98 },
      { time: '2024-10-12 08:00', value: 97 },
      { time: '2024-10-13 08:00', value: 98 },
    ],
    bloodGlucoseData: [
      { time: '2024-10-01 08:00', value: 6.0 },
      { time: '2024-10-02 08:00', value: 6.1 },
      { time: '2024-10-03 08:00', value: 6.2 },
      { time: '2024-10-04 08:00', value: 6.3 },
      { time: '2024-10-05 08:00', value: 6.4 },
      { time: '2024-10-06 08:00', value: 6.5 },
      { time: '2024-10-07 08:00', value: 6.6 },
      { time: '2024-10-08 08:00', value: 6.7 },
      { time: '2024-10-09 08:00', value: 6.8 },
      { time: '2024-10-10 08:00', value: 6.9 },
      { time: '2024-10-11 08:00', value: 6.9 },
      { time: '2024-10-12 08:00', value: 6.8 },
      { time: '2024-10-13 08:00', value: 6.8 },
    ],
  }
}

export function set(key, val) {
  globalData[key] = val
}

export function get(key) {
  return globalData[key]
}
