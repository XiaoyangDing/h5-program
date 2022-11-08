import Mock from 'mockjs'

let code = ''

const login = (params: any) => {
  const req = JSON.parse(params.body)
  console.log('req', req)
  if (req.code === code) {
    return {
      param: {
        token: new Date().getTime()
      },
      respCode: '000000',
      respMsg: '登录成功'
    }
  }
  return {
    param: null,
    respCode: '999999',
    respMsg: '登录失败，手机号或验证码不正确!'
  }
}

const sendCode = (params: any) => {
  const req = JSON.parse(params.body)
  code = (Math.random() * 1000000).toFixed(0).toString()
  console.log('req', req)
  return {
    param: {
      code: code
    },
    respCode: '000000',
    respMsg: '获取成功'
  }
}

Mock.mock('/user/login', 'post', login) //登录
Mock.mock('/user/sendCode', 'post', sendCode) //获取验证码
