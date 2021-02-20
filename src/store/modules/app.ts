import { InjectionKey } from 'vue';
import { Module, Store, useStore as baseUseStore } from 'vuex';
import { RootStateTypes, AppStateTypes } from '/@/store/interface';

const appModule: Module<AppStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    title: '',
  },
  getters: {},
  mutations: {},
  actions: {},
};

export default appModule;
export const key: InjectionKey<Store<AppStateTypes>> = Symbol('appModule');

export function useAppStore<T = AppStateTypes>() {
  return baseUseStore<T>(key);
}
