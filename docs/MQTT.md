# MQTT API

## 绑定药盒和可穿戴设备

### 陀螺仪端和药盒端

1. 想一个随机字符串作为id（例如：a1b2c3d4）
2. 把ClientId写死进代码里
  - 药盒的clientId：box_id（box_a1b2c3d4）
  - 陀螺仪的clientId：gyroscope_id（gyroscope_a1b2c3d4）
3. 根据id生成二维码（[二维码生成在线工具](https://cli.im/)）
4. 把二维码打印下来贴在药盒上

### 小程序端

1. 去设置>绑定设备
2. 扫描药盒上的二维码获取id（a1b2c3d4）
3. 算出药盒的clientId：box_id（box_a1b2c3d4）
4. 算出陀螺仪的clientId：gyroscope_id（gyroscope_a1b2c3d4）

## 监听老人跌倒信息

### 陀螺仪端

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

## 录入药品信息

### 药盒端

药盒扫描完后会将下面的消息发布到主题 `drug/id/adddrug`

```json
{
  "id": "a1b2c3d4",
  "code": 200,
  "message": "药品已入库",
  "druginfo": {
    "name": "毛果芸香碱滴眼液",
    "use": "一次1滴，一日1～4次",
    "func": "慢性青光眼、闭角型青光眼",
    "otc": false
  },
  "timestamp": 1721804283
}
```

### 小程序端

绑定好设备后，订阅主题 `drug/id/adddrug`

若获取到code=200的消息，则弹窗提醒。消息就是message里的内容。
