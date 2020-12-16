import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    component: Layout,
    path: '/',
    name: 'Home'
  }
]

export const asyncRoutes = []

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: constantRoutes
})

export default router

export function resetRouter () {
  const newRouter = createRouter({
    history,
    routes: constantRoutes
  })
  router.matcher = newRouter.matcher // reset router
}
