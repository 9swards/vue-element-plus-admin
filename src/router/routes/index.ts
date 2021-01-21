import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types'

/**
 * @description: default layout
 */
export const LAYOUT = () => import('/@/layouts/index.vue')

import { mainOutRoutes } from './mainOut'

const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
export const asyncRoutes = [...routeModuleList]

export const LOGIN_ROUTE: AppRouteRecordRaw = {
  meta: {
    title: '',
  },
  redirect: undefined,
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/login/index.vue'),
}

// 404 on a page
export const PAGE_404_ROUTE: AppRouteRecordRaw = {
  name: '',
  path: '/404',
  component: () => import('/@/views/error-page/404.vue'),
  meta: {
    title: '',
    hideMenu: true,
  },
}

// 401 on a page
export const PAGE_401_ROUTE: AppRouteRecordRaw = {
  name: '',
  path: '/401',
  component: () => import('/@/views/error-page/401.vue'),
  meta: {
    title: '',
    hideMenu: true,
  },
}
export const RootRoute: AppRouteRecordRaw = {
  name: '',
  meta: {
    title: '',
  },
  path: '/',
  component: LAYOUT,
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard',
      component: () => import('/@/views/dashboard/index.vue'),
      name: 'Dashboard',
      meta: { title: 'Dashboard', icon: 'dashboard', affix: true },
    },
  ],
}

export const REDIRECT_NAME = 'Redirect'
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
}

// 基础路由 不用权限
export const basicRoutes = [
  LOGIN_ROUTE,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_404_ROUTE,
  PAGE_401_ROUTE,
]
