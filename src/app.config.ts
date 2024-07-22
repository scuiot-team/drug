export default defineAppConfig({
  // 每个 page 都必须在这里注册
  pages: [
    'pages/homePage/home',
    'pages/selfPage/self',
    'pages/statisticsPage/statistics',
    'pages/chatPage/chat',
    'pages/patientsPage/patients',
    'pages/sosPage/sos',
    'pages/aboutPage/about',
    'pages/settingPage/setting',
    'pages/selfInfoPage/selfInfo',
    'pages/articlePage/article',
    'pages/patientInfoPage/patientInfo',
    'pages/editPatientInfoPage/editPatientInfo',
    'pages/loginPage/login',
    'pages/paraPage/para',
    'pages/para2Page/para2',
    'pages/addRecordPage/addRecord',
    'pages/addRecord2Page/addRecord2',
    'pages/addDrugPage/addDrug',
    'pages/manageDrugPage/manageDrug',
    'pages/editDrugPage/editDrug',
    'pages/bindPage/bind',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    // Tab 必须在这里注册才能用 Taro.switchTab() 跳转
    custom: true,
    list: [
      {
        text: "首页",
        pagePath: "pages/homePage/home",
      },
      {
        text: "统计",
        pagePath: "pages/statisticsPage/statistics",
      },
      {
        text: "问AI",
        pagePath: "pages/chatPage/chat",
      },
      {
        text: "我的",
        pagePath: "pages/selfPage/self",
      },
    ]
  }
})
