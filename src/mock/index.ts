import Mock from 'mockjs'

const login = (params: any) => {
  const req = JSON.parse(params.body)
  console.log('req', req)
  if (req.phone === '13888888888' && req.code === '123456') {
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
    respMsg: '登录失败，账号或密码不正确'
  }
}

Mock.mock('/user/login', 'post', login) //登录
