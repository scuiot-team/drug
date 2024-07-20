#!/usr/bin/env python
# coding=utf-8
import os
import hmac
import base64
import time
from hashlib import sha1
from paho.mqtt.client import (
    MQTT_LOG_INFO,
    MQTT_LOG_NOTICE,
    MQTT_LOG_WARNING,
    MQTT_LOG_ERR,
    MQTT_LOG_DEBUG,
)
from paho.mqtt import client as mqtt


# 实例 ID，购买后从产品控制台获取
instanceId = "post-cn-wuf3tztf304"

## 此处填写阿里云帐号 AccessKey
## 账号 accesskey，从账号系统控制台获取
## 阿里云账号AccessKey拥有所有API的访问权限，建议您使用RAM用户进行API访问或日常运维。
## 强烈建议不要把AccessKey ID和AccessKey Secret保存到工程代码里，否则可能导致AccessKey泄露，威胁您账号下所有资源的安全。
## 可以把AccessKey ID和AccessKey Secret保存在环境变量。运行本代码示例之前，请先配置环境变量MQTT_AK_ENV和MQTT_SK_ENV
## 例如：export MQTT_AK_ENV=access_key_id
##      export MQTT_SK_ENV=access_key_secret
## 需要将access_key_id替换为已准备好的AccessKey ID，access_key_secret替换为AccessKey Secret
accessKey = os.getenv("AliyunAK")
# 账号secretKey 从阿里云账号控制台获取
secretKey = os.getenv("AliyunSK")

# MQTT GroupID,创建实例后从 MQTT 控制台创建
groupId = "GID_drug"

# MQTT ClientID，由 GroupID 和后缀组成，需要保证全局唯一
client_id = groupId + "@@@" + "12345"

# Topic， 其中第一级父级 Topic 需要从控制台创建
topic = "drug/hello"

# MQTT 接入点域名，实例初始化之后从控制台获取
brokerUrl = "post-cn-wuf3tztf304.mqtt.aliyuncs.com"


def on_log(client, userdata, level, buf):
    if level == MQTT_LOG_INFO:
        head = "INFO"
    elif level == MQTT_LOG_NOTICE:
        head = "NOTICE"
    elif level == MQTT_LOG_WARNING:
        head = "WARN"
    elif level == MQTT_LOG_ERR:
        head = "ERR"
    elif level == MQTT_LOG_DEBUG:
        head = "DEBUG"
    else:
        head = level
    print("%s: %s" % (head, buf))


def on_connect(client, userdata, connect_flags, reason_code, properties):
    print("Connected with result code " + str(properties))
    client.subscribe(topic, 0)
    for i in range(1, 11):
        print(i)
        properties = client.publish(topic, str(i), qos=0)
        print("properties: %s" % properties)
        time.sleep(0.1)


def on_message(client, userdata, message):
    print(message.topic + " " + str(message.payload))


def on_disconnect(client, userdata, disconnect_flags, reason_code, properties, rc=0):
    if rc != 0:
        print("Unexpected disconnection %s" % rc)


client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id, clean_session=True)
client.on_log = on_log
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

## username和 Password 签名模式下的设置方法
## 参考文档 https://help.aliyun.com/document_detail/48271.html?spm=a2c4g.11186623.6.553.217831c3BSFry7
userName = "Signature" + "|" + accessKey + "|" + instanceId
password = base64.b64encode(
    hmac.new(secretKey.encode(), client_id.encode(), sha1).digest()
).decode()

client.username_pw_set(userName, password)
print(client_id) # 输出ClientID
print(userName) # 输出签名过的用户名
print(password) # 输出签名过的密码

# ssl设置，并且port=8883
# client.tls_set(ca_certs=None, certfile=None, keyfile=None, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLS, ciphers=None)

client.connect(brokerUrl, 1883, 60)
client.loop_forever()
