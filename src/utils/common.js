// utils/common.js
import Taro from '@tarojs/taro'

export function getWindowHeight(showTabBar = true) {
    const TAB_BAR_HEIGHT = 50
    const NAVIGATOR_HEIGHT = 44
    const info = Taro.getSystemInfoSync()
    const { windowHeight, statusBarHeight } = info
    const tabBarHeight = showTabBar ? TAB_BAR_HEIGHT : 0

    if (process.env.TARO_ENV === 'rn') {
        return windowHeight - statusBarHeight - NAVIGATOR_HEIGHT - tabBarHeight
    }

    if (process.env.TARO_ENV === 'h5') {
        return `${windowHeight - tabBarHeight}px`
    }

    return `${windowHeight}px`
}
