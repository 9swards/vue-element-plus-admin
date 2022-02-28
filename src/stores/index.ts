import { InjectionKey } from 'vue'
import { ModuleTree, Store, useStore as baseUseStore } from 'vuex'
import { IState } from '@/types'
import actions from './actions'
import mutations from './mutations'

const debug = import.meta.env.NINE_DEBUG || false
const modules: ModuleTree<any> = {}
const importModules = import.meta.globEager('./modules/**/*.[t|j]s')
Object.keys(importModules).forEach((value: any) => {
  const mKey = value
    .split('/')
    .pop()
    .replace(/(.*)\.+(.*)/, '$1')
  modules[mKey] = importModules[value].default
})

export const rootKey: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  actions,
  mutations,
  modules,
})

export function useStore(): Store<IState> {
  return baseUseStore(rootKey)
}
