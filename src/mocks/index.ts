import Mock from 'mockjs'
import './user'
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
