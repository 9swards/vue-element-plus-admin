import './layout'
import './user'

import { store } from '@/stores'
import axios from 'axios'
import { ElLoading, ElNotification } from 'element-plus'
import { UseAxiosOptions } from '@vueuse/integrations/useAxios'

let loading: any = null
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: import.meta.env.NINE_BASE_URL,
  timeout: 60000, // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: any) => {
  loading.close()
  ElNotification({
    title: '请求失败',
    message: error.message,
    type: 'error',
  })
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config) => {
  loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.4)',
  })
  const token = store.state.auth.userInfo.accessToken
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    Object.assign(config, { headers: { 'Access-Token': token } })
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use(async (response) => {
  const { data } = response
  loading.close()
  if (data.code !== 200) {
    let title = '请求失败'
    if (data.code === 401) {
      if (store.state.auth.userInfo.accessToken) {
        await store.dispatch('auth/LOGOUT')
      }
      title = '身份认证失败'
    }
    ElNotification({
      title,
      message: data.Msg,
      type: 'error',
    })
    return Promise.reject(new Error(data.Msg || 'Error'))
  }
  return response
}, errorHandler)

export default request

const useAxiosOption: UseAxiosOptions = {
  immediate: true,
}
export { useAxiosOption }
