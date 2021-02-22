import type { App, InjectionKey } from 'vue';
// import type { Store } from 'vuex';

import { createStore, useStore as baseUseStore } from 'vuex';

import appModule from '/@/stores/modules/app';
import { MODULES, AllStateTypes, RootStateTypes, Store } from '/@/stores/interfaces';

const store = createStore<RootStateTypes>({
  state: {
    app: 'vue e+ admin',
  },
  getters: {
    app(state) {
      return state.app;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    [MODULES.APP_MODULE_NAME]: appModule,
  },
});

export const key: InjectionKey<Store> = Symbol('e-store');

export function setupStore(app: App<Element>) {
  app.use(store, key);
}

export function useStore<T = AllStateTypes>(pkey?: Symbol) {
  return baseUseStore<T>(pkey ?? key);
}
export default store;
