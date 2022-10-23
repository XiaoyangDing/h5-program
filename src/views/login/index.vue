<template>
  <div class="login">
    <div class="login-header">
      <h3>您好！</h3>
      <p>欢迎使用小H服务</p>
    </div>
    <div class="login-section">
      <div class="login-section-form">
        <g-form-item
          v-model="loginForm.phone"
          icon="icon-phone"
          placeholder="请输入手机号"
          :maxlength="11"
        ></g-form-item>
        <g-form-item
          v-model="loginForm.code"
          icon="icon-code"
          placeholder="请输入验证码"
          :maxlength="6"
        ></g-form-item>
        <van-button type="primary" :disabled="!(loginForm.phone && loginForm.code)" @click="Login"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { usePiniaStore } from '@/store/index'
import { login } from '@/api/login'
import GFormItem from '@/components/GFormItem/index.vue'
import { Toast } from 'vant'
const piniaStore = usePiniaStore()
const { getToken } = piniaStore
const loginForm = reactive({
  phone: '',
  code: ''
})
const Login = async () => {
  const res: any = await login(loginForm)
  console.log('res', res)
  Toast(`登录成功，token为${res.token}`)
  updateToken(res.token)
}

const updateToken = (token: string) => {
  getToken(token)
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  &-header {
    position: relative;
    width: 100%;
    height: 420px;
    padding: 90px 70px;
    z-index: 1;
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 420px;
      background: url('../../assets/images/login-banner.png');
      background-size: 100% 100%;
    }
    &::after {
      content: '';
      position: absolute;
      top: -300%;
      left: -150%;
      width: 3000px;
      height: 1680px;
      border-radius: 50%;
      background: linear-gradient(227deg, #3186ff 0%, #247fff 100%);
      z-index: -1;
    }
    h3 {
      font-size: 56px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 68px;
    }
    p {
      margin-top: 16px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 45px;
    }
  }
  &-section {
    position: relative;
    margin: -122px 20px 0;
    padding: 40px;
    border-radius: 24px;
    background: #ffffff;
    z-index: 9;
    .van-button {
      margin-top: 58px;
    }
  }
}
</style>
