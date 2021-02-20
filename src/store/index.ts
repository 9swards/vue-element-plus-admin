import type { App, InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';

import appModule from '/@/store/modules/app';
import userModule from '/@/store/modules/user';
import permissionModule from '/@/store/modules/permission';
import errorModule from '/@/store/modules/error';

import { AllStateTypes, RootStateTypes } from '/@/store/interface';

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
    appModule,
    userModule,
    permissionModule,
    errorModule,
  },
});

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('vue-store');

export function useStore<T = AllStateTypes>() {
  return baseUseStore<T>(key);
}

export function setupStore(app: App<Element>) {
  app.use(store, key);
}

export default store;

export function hotModuleUnregisterModule(name: string) {
  if (!name) return;
  if ((store.state as any)[name]) {
    store.unregisterModule(name);
  }
}
