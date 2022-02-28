import { ActionContext } from 'vuex'
import { IState } from '@/types'
import { login, LoginParam } from '@/apis/user'
import { IAuth } from '@/types/store/auth'
import router from '@/routers'

const STORAGE_TOKEN = 'access-token'
const state: IAuth = {
  userInfo: {
    name: '',
    accessToken: localStorage.getItem(STORAGE_TOKEN) || '',
  },
}

const mutations = {
  login(state: IAuth, accessToken = ''): void {
    Object.assign(state.userInfo, { accessToken })
    localStorage.setItem(STORAGE_TOKEN, accessToken)
  },

  logout(state: IAuth): void {
    Object.assign(state.userInfo, { accessToken: '' })
    localStorage.removeItem(STORAGE_TOKEN)
  },
}

const actions = {
  async LOGIN(context: ActionContext<IAuth, IState>, param: LoginParam): Promise<void> {
    const res = await login(param)
    await context.commit('login', res)
    await router.push({ name: 'Login' })
  },
  async LOGOUT(context: ActionContext<IAuth, IState>): Promise<void> {
    context.commit('logout')
  },
}

const authState = {
  namespaced: true,
  state,
  mutations,
  actions,
}

export default authState
