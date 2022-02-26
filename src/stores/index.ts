import { createStore, Store, useStore as baseUseStore } from 'vuex'
import layout from '@/stores/modules/layout'
import { IState } from '@/types/store/index'

export const store = createStore<IState>({
  modules: {
    layout,
  },
})

export function useStore(): Store<IState> {
  return baseUseStore()
}
