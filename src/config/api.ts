interface Config {
  code: string
  data: string
  msg: string
  encode: string
  signData: string
  isOK: (response: any) => boolean
  errorCodes: Array<string>
  errorCallback: () => void
}

// 请求地址
const base = ''
// 完整请求地址
const url: string = base

// 数据传输类配置
const contentType = 'application/json' // form提交数据：application/x-www-form-urlencoded

const responseConfig: Config = {
  // 响应代码
  code: 'respCode',
  // 响应数据
  data: 'param',
  // 错误提示信息
  msg: 'respMsg',
  // 加密数据
  encode: 'encData',
  // 签名数据
  signData: 'signData',
  // 响应是否是成功的
  isOK: (response: any) => {
    return response instanceof Object && response[responseConfig.code] === '000000'
  },
  // tokenCheck为true时，token验证不通过时返回的异常码， 出现这种情况情况下将直接执行回调errorCallBack
  errorCodes: [],
  errorCallback: () => {
    // token过期后,自定义处理,或返回错误
  }
}

export default {
  base,
  url,
  contentType,
  responseConfig
}
