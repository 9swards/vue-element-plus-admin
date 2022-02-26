import Mock from 'mockjs'

Mock.mock('/login', 'post', (req: any) => {
  const { username, password } = JSON.parse(req.body)
  if (username === 'admin' && password === 'admin') {
    return Mock.mock({
      Code: 200,
      Msg: '登录成功',
      Data: 'admin-token',
    })
  }
  return Mock.mock({
    Code: 401,
    Msg: '登录失败',
    Data: '',
  })
})

const routes = [
  {
    id: 1,
    parentId: 0,
    name: 'Test',
    path: '/Test',
    component: 'Layout',
    redirect: '/Test/TestList',
    meta: { title: '测试', icon: 'el-icon-phone' },
  },
]
Mock.mock('/getRouterList', 'get', () => {
  return Mock.mock({
    Code: 200,
    Data: routes,
    Msg: 'aaaa',
  })
})
