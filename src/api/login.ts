import axios from '@/utils/http'

namespace Login {
  // 用户登录表单
  export interface LoginReqForm {
    phone: string
    code: string
  }
  export interface SendCodeReqForm {
    phone: string
  }
  // 登录成功后返回的token
  export interface LoginResData {
    token: string
  }
  export interface SendCodeResData {
    code: string
  }
}

// 用户登录
export const login = (params: Login.LoginReqForm) => {
  // 返回的数据格式可以和服务端约定
  return axios.post<Login.LoginResData>('/user/login', params)
}

// 获取验证码
export const sendCode = (params: Login.SendCodeReqForm) => {
  // 返回的数据格式可以和服务端约定
  return axios.post<Login.SendCodeResData>('/user/sendCode', params)
}
