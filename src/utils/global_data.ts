const globalData = {
    tabList: [
        { url: "/pages/homePage/home", title: "首页", iconType: "home", text: "new" },
        { url: "/pages/dataPage/data", title: "统计", iconType: "bullet-list" },
        { url: "/pages/chatPage/chat", title: "问AI", iconType: "message" },
        { url: "/pages/selfPage/self", title: "我的", iconType: "user", max: 99 },
    ],
    userInformation: {
        avatarUrl: "/images/avatar.png",
        nickName: "未登录",
        isLogin: false,
    },
}

export function set(key, val) {
    globalData[key] = val
}

export function get(key) {
    return globalData[key]
}
