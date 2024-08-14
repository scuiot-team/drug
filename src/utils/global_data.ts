import PatientInfo from "./patientInfo"
import { DrugInfo, DrugData, DrugRecord } from "./drugData";

let globalData = {
  box_id: "",
  MQTTurl: "i7148e41.ala.us-east-1.emqxsl.com",
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
      '小明', 66, '男', '19434636375', 'https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280', '子女', '高血压', '否', '暂无', '良好', 170, 60, 100, 99, 100, 70, '胰岛素增敏剂'
    ),
    new PatientInfo(
      '老明', 90, '男', '19436563675', 'https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280', '子孙', '糖尿病', '否', '暂无', '良好', 162, 52, 100, 99, 100, 73, '胰岛素增敏剂'
    ),
  ],
  // 药盒库存
  drugStock: [
    new DrugInfo("1721804283", "毛果芸香碱滴眼液", "一次1滴，一日1～4次", "慢性青光眼、闭角型青光眼", false),
    new DrugInfo("1721804283", "布洛芬胶囊", "一次1粒，一日3～4次", "缓解类风湿关节炎和骨关节炎、解热镇痛", true),
  ],
  // 用药记录
  drugRecord: [
    new DrugRecord("1720656002", "毛果芸香碱", "1", "滴", "滴眼", "2024-08-13", "00:00:00", false),
    new DrugRecord("1720656001", "山莨菪碱", "2", "片", "口服", "2024-08-13", "02:30:00", false),
    new DrugRecord("1720656003", "阿托品", "2", "片", "口服", "2024-08-13", "06:30:00", false),
    new DrugRecord("1720656000", "阿司匹林", "1", "片", "口服", "2024-08-13", "08:00:00", false),
    new DrugRecord("1720656004", "胰岛素", "1", "滴", "静脉注射", "2024-08-13", "08:00:00", false),
  ],
  // 用药计划
  drugs: [
    // 阿司匹林 每隔12小时1片，从 2024-07-11 08:00:00 起，至 2024-10-10 结束
    new DrugData('1720656000', '阿司匹林', '1', '片', '口服', '12:00:00', '08:00:00', '2024-07-20', '2024-10-10'),
    new DrugData('1720656001', '山莨菪碱', '2', '片', '口服', '10:30:00', '10:00:00', '2024-07-19', '2024-10-10'),
    new DrugData('1720656002', '毛果芸香碱', '1', '滴', '滴眼', '16:00:00', '08:00:00', '2024-07-18', '2024-10-10'),
    new DrugData('1720656003', '阿托品', '2', '片', '口服', '13:30:00', '08:00:00', '2024-07-21', '2024-10-10'),
    new DrugData('1720656004', '胰岛素', '1', '滴', '静脉注射', '24:00:00', '08:00:00', '2024-07-19', '2024-10-10'),
  ],
  // 健康指标
  healthIndicators: {
    heightData: [{ date: '2024-10-01', time: '08:00:00', value: 170 }],
    bloodPressureData: [
      { date: '2024-10-01', time: '08:00:00', high: 110, low: 80 },
      { date: '2024-10-02', time: '08:00:00', high: 112, low: 80 },
      { date: '2024-10-03', time: '08:00:00', high: 115, low: 82 },
      { date: '2024-10-04', time: '08:00:00', high: 113, low: 81 },
      { date: '2024-10-05', time: '08:00:00', high: 110, low: 79 },
      { date: '2024-10-06', time: '08:00:00', high: 108, low: 75 },
      { date: '2024-10-07', time: '08:00:00', high: 109, low: 73 },
      { date: '2024-10-08', time: '08:00:00', high: 110, low: 72 },
      { date: '2024-10-09', time: '08:00:00', high: 111, low: 70 },
      { date: '2024-10-10', time: '08:00:00', high: 112, low: 71 },
    ],
    weightData: [
      { date: '2024-10-01', time: '08:00:00', value: 65 },
      { date: '2024-10-02', time: '08:00:00', value: 64 },
      { date: '2024-10-03', time: '08:00:00', value: 65 },
      { date: '2024-10-04', time: '08:00:00', value: 64 },
      { date: '2024-10-05', time: '08:00:00', value: 65 },
      { date: '2024-10-06', time: '08:00:00', value: 65 },
      { date: '2024-10-07', time: '08:00:00', value: 66 },
      { date: '2024-10-08', time: '08:00:00', value: 67 },
      { date: '2024-10-09', time: '08:00:00', value: 68 },
      { date: '2024-10-10', time: '08:00:00', value: 69 },
      { date: '2024-10-11', time: '08:00:00', value: 69 },
      { date: '2024-10-12', time: '08:00:00', value: 68 },
      { date: '2024-10-13', time: '08:00:00', value: 68 },
    ],
    heartRateData: [
      { date: '2024-10-01', time: '08:00:00', value: 70 },
      { date: '2024-10-02', time: '08:00:00', value: 69 },
      { date: '2024-10-03', time: '08:00:00', value: 70 },
      { date: '2024-10-04', time: '08:00:00', value: 71 },
      { date: '2024-10-05', time: '08:00:00', value: 70 },
      { date: '2024-10-06', time: '08:00:00', value: 70 },
      { date: '2024-10-07', time: '08:00:00', value: 69 },
      { date: '2024-10-08', time: '08:00:00', value: 70 },
      { date: '2024-10-09', time: '08:00:00', value: 71 },
      { date: '2024-10-10', time: '08:00:00', value: 72 },
      { date: '2024-10-11', time: '08:00:00', value: 73 },
      { date: '2024-10-12', time: '08:00:00', value: 74 },
      { date: '2024-10-13', time: '08:00:00', value: 72 },
    ],
    bloodOxygenData: [
      { date: '2024-10-01', time: '08:00:00', value: 98 },
      { date: '2024-10-02', time: '08:00:00', value: 98 },
      { date: '2024-10-03', time: '08:00:00', value: 99 },
      { date: '2024-10-04', time: '08:00:00', value: 98 },
      { date: '2024-10-05', time: '08:00:00', value: 98 },
      { date: '2024-10-06', time: '08:00:00', value: 99 },
      { date: '2024-10-07', time: '08:00:00', value: 98 },
      { date: '2024-10-08', time: '08:00:00', value: 98 },
      { date: '2024-10-09', time: '08:00:00', value: 99 },
      { date: '2024-10-10', time: '08:00:00', value: 98 },
      { date: '2024-10-11', time: '08:00:00', value: 98 },
      { date: '2024-10-12', time: '08:00:00', value: 97 },
      { date: '2024-10-13', time: '08:00:00', value: 98 },
    ],
    bloodGlucoseData: [
      { date: '2024-10-01', time: '08:00:00', value: 6.5 },
      { date: '2024-10-02', time: '08:00:00', value: 6.4 },
      { date: '2024-10-03', time: '08:00:00', value: 6.3 },
      { date: '2024-10-04', time: '08:00:00', value: 6.4 },
      { date: '2024-10-05', time: '08:00:00', value: 6.4 },
      { date: '2024-10-06', time: '08:00:00', value: 6.5 },
      { date: '2024-10-07', time: '08:00:00', value: 6.6 },
      { date: '2024-10-08', time: '08:00:00', value: 6.7 },
      { date: '2024-10-09', time: '08:00:00', value: 6.7 },
      { date: '2024-10-10', time: '08:00:00', value: 6.7 },
      { date: '2024-10-11', time: '08:00:00', value: 6.9 },
      { date: '2024-10-12', time: '08:00:00', value: 6.8 },
      { date: '2024-10-13', time: '08:00:00', value: 6.8 },
    ],
  }
}

export function setGlobalData(key: string, val: any) {
  globalData[key] = val
}

export function getGlobalData(key: string) {
  return globalData[key]
}
