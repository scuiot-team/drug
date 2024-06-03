export default defineAppConfig({
    // 每个 page 都必须在这里注册
    pages: [
        'pages/homePage/home',
        'pages/selfPage/self',
        'pages/dataPage/data',
        'pages/chatPage/chat',
        'pages/patientsPage/patients',
        'pages/sosPage/sos',
        'pages/aboutPage/about',
        'pages/settingPage/setting',
        'pages/selfInfoPage/selfInfo',
        'pages/articlePage/article',
        'pages/patientInfoPage/patientInfo',
        'pages/editPatientInfoPage/editPatientInfo',
        'pages/loginPage/login'
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
                pagePath: "pages/dataPage/data",
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
