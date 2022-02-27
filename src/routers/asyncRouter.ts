import { IMenubarList } from '@/types/store/layout'
import { listToTree } from '@/utils/listToTree'
import { store } from '@/stores/index'
const components = {
  Layout: () => import('@/layouts/default/index.vue'),
  404: () => import('@/views/error-pages/404.vue'),
}

const asyncRouter: Array<IMenubarList> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: components['404'],
    meta: {
      title: 'NotFound',
      icon: '',
    },
    redirect: '/404',
    hidden: true,
  },
]

export const generatorDynamicRouter = (data: Array<IMenubarList>): void => {
  const routerList: Array<IMenubarList> = listToTree(data, 0)
  asyncRouter.forEach((v) => routerList.push(v))
  const f = (data: Array<IMenubarList>, pData: IMenubarList | null) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const v: IMenubarList = data[i]
      //   v.component = components[typeof v.component === 'string' && v.component]
      v.component = components[v.component] || (() => import(`../view${path}.vue`))
      // v.component = () => import(`../view${data[i].path}.vue`)
      if (!v.meta.permission || (pData && v.meta.permission.length === 0)) {
        v.meta.permission = pData && pData.meta && pData.meta.permission ? pData.meta.permission : []
      }
      if (v.children && v.children.length > 0) {
        f(v.children, v)
      }
    }
  }
  f(routerList, null)
  store.commit('layout/setRoutes', routerList)
}
