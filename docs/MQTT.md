# MQTT API

## 绑定药盒和可穿戴设备

### 陀螺仪端和药盒端：

1. 想一个随机字符串作为id（例如：a1b2c3d4）
2. 把ClientId写死进代码里
  - 药盒的clientId：box_id（box_a1b2c3d4）
  - 陀螺仪的clientId：gyroscope_id（gyroscope_a1b2c3d4）
3. 根据id生成二维码（[二维码生成在线工具](https://cli.im/)）
4. 把二维码打印下来贴在药盒上

### 小程序端

1. 扫码获取id（a1b2c3d4）
2. 算出药盒的clientId：box_id（box_a1b2c3d4）
3. 算出陀螺仪的clientId：gyroscope_id（gyroscope_a1b2c3d4）

## 监听老人跌倒信息

### 陀螺仪端：

若监测到老人跌倒，则发布到主题 `drug/id/slip`

```json
{
  // 写死在代码里的id
  "id": "a1b2c3d4",
  "code": 400,
  "message": "监测到患者摔倒",
  // 时间戳（精度：秒）
  "timestamp": 1721804282
}
```

### 小程序端

绑定好设备后，订阅主题 `drug/id/slip`

若获取到code=400的消息，则弹窗提醒，消息就是message里的内容。
