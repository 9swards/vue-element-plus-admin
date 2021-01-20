import {createRouter, createWebHashHistory, RouteRecordRaw, RouterHistory} from 'vue-router'
import Layout from '../layout'

export const constantRoutes: RouteRecordRaw[] = [
    {
        component: Layout,
        path: '/',
        name: 'Home'
    }
]

export const asyncRoutes: RouteRecordRaw[] = []
const history: RouterHistory = createWebHashHistory(process.env.BASE_URL)
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: constantRoutes
})

export default router

export function resetRouter() {
    const newRouter = createRouter({
        history,
        routes: constantRoutes
    })
    router.matcher = newRouter.matcher // reset router
}
