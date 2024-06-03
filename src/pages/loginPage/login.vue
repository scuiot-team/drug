<template>
  <view class="body">
    <AtInput
      class="input"
      placeholderClass='placeholder'
      title='账号'
      type='text'
      placeholder='手机号/邮箱'
      :value='account'
      :onChange='accountInput.bind(this)'
    />
    <AtInput
      class="input"
      placeholderClass='placeholder'
      title='密码'
      type='password'
      placeholder='请输入密码'
      :value='password'
      :onChange='passwordInput.bind(this)'
    />
    <AtButton class="login" @click="login">保存</AtButton>
  </view>
</template>

<script>
  export default {
    name: "loginPage",
  }
</script>

<script setup>
  import "./login.sass"
  import Taro from '@tarojs/taro'
  import { set as setGlobalData, get as getGlobalData } from "../../utils/global_data"

  let account = ''
  let password = ''
  function accountInput(e){
    account = e
  }
  function passwordInput(e){
    password = e
  }
  function login(){
    if (account&&password){
      // 注册或登录用户
      Taro.request({
        url: 'https://api.rainmaker.espressif.com/v1/user2/',
        method:'POST',
        data: {
          user_name: account,
          password: password
        },
        header: {
          'content-type': 'application/json' 
        },
        success: res1=>{
          console.log(res.data)
          let userInfo = getGlobalData('userInfo')
          userInfo.account = account
          userInfo.password = password
          setGlobalData('userInfo',userInfo)
          // 保存用户信息(未测试)
          Taro.request({
            url: 'https://api.rainmaker.espressif.com/v1/user/custom_data/',
            method:'POST',
            data: {
              profile: {
                value: {
                  userInfo:userInfo,
                  patients:[]  //创建用户时创建一个空的监护患者列表
                }
              }
            },
            header: {
              'content-type': 'application/json' 
            },
            success: res2=> {
              console.log(res2)
            }
          })
        }
      })
    }
    else{
      Taro.showToast({
        title: '请完善信息',
        icon:'none',
        duration: 1000
      })
    }
  }
</script>

