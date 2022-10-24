// http.ts
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { usePiniaStore } from '@/store/index'
import { Toast } from 'vant'
import api from '@/config/api'

// 自定义请求返回数据的类型
interface ResultData<T> {
  data: T
  respCode: string
  respMsg: string
}
enum RequestEnums {
  TIMEOUT = 20000, // 超时
  OVERDUE = 600, // 失效
  FAIL = '999999', // 失败
  SUCCESS = '000000' // 成功
}

const piniaStore = usePiniaStore()
const baseURL = ''
const config = {
  baseURL, // 默认地址
  timeout: RequestEnums.TIMEOUT as number
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到pinia本地储存当中
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = piniaStore.token || ''
        return {
          ...config,
          headers: {
            Authorization: token // 请求头中携带token信息
          }
        }
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response // 解构
        if (api.responseConfig.errorCodes.includes(data[api.responseConfig.code])) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          api.responseConfig.errorCallback()
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data[api.responseConfig.code] && data[api.responseConfig.code] !== RequestEnums.SUCCESS) {
          // 此处也可以使用组件提示报错信息
          Toast({
            message: data[api.responseConfig.msg] || '请求数据出错'
          })
          return Promise.reject(data)
        }
        return data[api.responseConfig.data]
      },
      (error: AxiosError) => {
        const { response } = error
        if (response) {
          this.handleCode(response.status)
        }
        if (!window.navigator.onLine) {
          // 可以跳转到404错误页面，也可以不做操作
          Toast({ message: '网络连接失败' })
        }
      }
    )
  }
  handleCode(code: number): void {
    switch (code) {
      case 401:
        Toast('登录失败，请重新登录')
        break
      default:
        Toast('请求失败')
        break
    }
  }
  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params })
  }
  post<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.post(url, params)
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params)
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params })
  }
}

// 导出一个实例对象
export default new RequestHttp(config)
