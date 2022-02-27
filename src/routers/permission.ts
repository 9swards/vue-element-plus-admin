import router from '@/routers'
import { store } from '@/stores'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

const loginRoutePath = '/login'
const defaultRoutePath = '/'

router.beforeEach(async (to, from) => {
  NProgress.start()
  const { layout } = store.state
  // 判断当前是否在登陆页面
  if (to.path.toLocaleLowerCase() === loginRoutePath.toLocaleLowerCase()) {
    NProgress.done()
    if (layout.accessToken) {
      return defaultRoutePath
    }
    return
  }
  // 判断是否登录
  if (!layout.accessToken) {
    return loginRoutePath
  }
  // 判断是否还没添加过路由
  if (layout.menubar.menuList.length === 0) {
    await store.dispatch('layout/generateRoutes')
    for (let i = 0; i < layout.menubar.menuList.length; i++) {
      router.addRoute(layout.menubar.menuList[i])
    }
    store.commit('layout/concatAllowRoutes')
    return to.fullPath
  }
  store.commit('layout/changeTagNavList', to) // 切换导航，记录打开的导航

  store.state.layout.tags.tagsList.some((v) => v.name === from.name) &&
    !store.state.layout.tags.cachedViews.some((v) => v === from.name) &&
    store.commit('layout/addCachedViews', { name: from.name, noCache: from.meta.noCache })
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
