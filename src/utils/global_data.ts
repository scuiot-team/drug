import PatientInfo from "./patientInfo"
const globalData = {
    tabList: [
        { url: "/pages/homePage/home", title: "首页", iconType: "home", text: "new" },
        { url: "/pages/dataPage/data", title: "统计", iconType: "bullet-list" },
        { url: "/pages/chatPage/chat", title: "问AI", iconType: "message" },
        { url: "/pages/selfPage/self", title: "我的", iconType: "user", max: 99 },
    ],
    userInfo:{
      isLogin:true,
      account:'',
      password:'',
      avatar:'https://img2.baidu.com/it/u=18303046,1217185652&fm=253&fmt=auto&app=138&f=JPEG?w=502&h=500',
      nickName:'小马哥',
      urgentPhone:''
    },
    patients:[
      new PatientInfo('小明',66,'男','19434636375', 'https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280','子女','高血压','否','暂无','良好',170,60,100,2.6,100,70,'胰岛素增敏剂'
      ),
      new PatientInfo('老明',90,'男','19436563675', 'https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280','子孙','糖尿病','否','暂无','良好',162,52,100,2.6,100,73,'胰岛素增敏剂'
      ),
    ]
}

export function set(key, val) {
    globalData[key] = val
}

export function get(key) {
    return globalData[key]
}
