import { createRouter, createWebHistory } from 'vue-router'
import { IMenubarList } from '@/types/store/layout'

const components = {
  Layout: () => import('@/layouts/default/index.vue'),
  Redirect: () => import('@/layouts/Redirect.vue'),
  404: () => import('@/views/error-pages/404.vue'),
  Login: () => import('@/views/login/index.vue'),
  Dashboard: () => import('@/views/dashboard/index.vue'),
}

// 免登录页面
export const whiteListRouter: Array<IMenubarList> = [
  {
    name: '404',
    path: '/404',
    meta: { title: '页面不存在', icon: 'i-failed' },
    component: components['404'],
    hidden: true,
  },
  {
    name: 'Login',
    path: '/login',
    component: components.Login,
    meta: { title: '登录', icon: 'el-icon-eleme' },
    hidden: true,
  },
  {
    name: 'Redirect',
    path: '/redirect/:pathMatch(.*)*',
    meta: {
      title: '重定向页面',
      icon: '',
      permission: [],
    },
    hidden: true,
    component: components.Redirect,
  },
  {
    name: 'Home',
    path: '/',
    component: components.Layout,
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'i-data-board' },
    children: [
      {
        name: 'Dashboard',
        path: '/dashboard',
        component: components.Dashboard,
        meta: { title: '工作台', icon: 'el-icon-s-tools' },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: whiteListRouter,
})

export default router
