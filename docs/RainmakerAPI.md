RainMaker 支持两种类型的 API：未经身份验证和已通过身份验证。

- 对于未经身份验证的 API，无需在 HTTP 标头中提供任何身份验证令牌。

当用户成功登录时，他会收到响应中的access_token。对于经过身份验证的 API，此access_token需要作为身份验证令牌在“授权”HTTP 标头中传递。

## 1. 创建用户

<https://api.rainmaker.espressif.com/v1/user2>

参数：

```json
{
  "user_name": "",  // 邮箱或带有国家、地区代码的手机号
  "password": ""
}
```

请求后相应邮箱或手机号会收到验证码verification_code，接着同一个请求地址，用验证码确认用户

参数：

```
{
  "user_name": "username@domain.com or <+Mobile Number with country code>",
  "verification_code": "verification_code"
}
```
注册成功

## 2. 登录

<https://api.rainmaker.espressif.com/v1/login2>

参数：
```json
{
  "user_name": "username@domain.com or +Mobile Number with country code",
  "password": "password"
}
```

登录成功返回：

```json
{
  "status": "success",
  "description": ""
}
```

其中accesstoken为身份验证标识，在之后的请求中需在请求头中传递

## 3. 修改用户数据

<https://api.rainmaker.espressif.com/v1/user/custom_data>

### 3.1. 添加数据

参数：

```json
{
  "profile": {
    "value": {
      "age": 20,  // 设为null即为删除
      "gender": "男",
...
    }
  }
}
```

### 3.2. 修改已有值

参数：

```json
{
  "membership_info": {
    "value": {
      "premium": false
    }
  },
  "profile": {
    "value": {
      "age": 19
    }
  }
}
```

### 3.3. 其他小功能类似

## 4. 获取用户数据

<https://api.rainmaker.espressif.com/v1/user/custom_data>

无参数

返回：

## 5. 获取用户详细信息

<https://api.rainmaker.espressif.com/v1/user2?custom_data=false>
<https://api.rainmaker.espressif.com/v1/user2?custom_data=true>

custom_data为true表示获取包括自定义数据，返回值：

## 6. 修改用户姓名或手机号

<https://api.rainmaker.espressif.com/v1/user2>

参数：

```json
{
  "name": ""
}
```
或
```json
{
  "phone_number": "+ Mobile Number with country code"
}
```

修改手机号会收到验证码，确认手机号：

```json
{
  "verification_code": "verification_code"
}
```
