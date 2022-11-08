<template>
  <div class="login">
    <div class="login-header">
      <h3>您好！</h3>
      <p>欢迎使用小H服务</p>
    </div>
    <div class="login-section">
      <div class="login-section-form">
        <g-form-item v-model="loginForm.phone" icon="icon-phone" placeholder="请输入手机号" :maxlength="11" />
        <g-form-item v-model="loginForm.code" icon="icon-code" placeholder="请输入验证码" :maxlength="6">
          <div class="item-text" @click="SendCode">
            {{ msg }}
          </div>
        </g-form-item>
        <van-button type="primary" :disabled="!(loginForm.phone && loginForm.code)" @click="Login"> 登录 </van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePiniaStore } from '@/store/index'
import { login, sendCode } from '@/api/login'
import GFormItem from '@/components/GFormItem/index.vue'
import { Toast } from 'vant'
import router from '@/router'
import { LoginForm } from '@/types/login/index'
const piniaStore = usePiniaStore()
const { getToken } = piniaStore
const loginForm = reactive<LoginForm>({
  phone: '',
  code: ''
})
const msg = ref('获取验证码')
const time = ref(60)

const SendCode = async () => {
  if (!loginForm.phone) {
    Toast('请输入手机号')
    return
  }
  if (!/^1[3456789]\d{9}$/.test(loginForm.phone)) {
    Toast('请输入正确的手机号')
    return
  }
  const res: any = await sendCode({ phone: loginForm.phone })
  console.log('res', res)
  const timer = setInterval(() => {
    if (time.value > 0 && time.value <= 60) {
      time.value--
      msg.value = time.value + 's'
    } else {
      clearInterval(timer)
      time.value = 60
      msg.value = '获取验证码'
    }
  }, 1000)
  Toast(`验证码发送成功，验证码为：${res.code}`)
}

const Login = async () => {
  const res: any = await login(loginForm)
  console.log('res', res)
  Toast(`登录成功，token为${res.token}`)
  updateToken(res.token)
  router.push('/404')
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
    .item-text {
      min-width: 120px;
      text-align: center;
      color: $primary-color;
      font-size: 30px;
    }
  }
}
</style>
