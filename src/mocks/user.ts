import Mock from 'mockjs'

Mock.mock('/login', 'post', (req: any) => {
  const { username, password } = JSON.parse(req.body)
  if (username === 'admin' && password === 'admin') {
    return Mock.mock({
      code: 200,
      message: '登录成功',
      data: 'admin-token',
    })
  }
  return Mock.mock({
    code: 401,
    message: '登录失败',
    data: '',
  })
})
