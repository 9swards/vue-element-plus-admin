import type { App, InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import userModule from '/@/stores/modules/user';
import { AllStateTypes, RootStateTypes } from '/@/stores/interface';

const store = createStore<RootStateTypes>({
  state: {
    app: 'vue ep admin',
  },
  getters: {
    app(state) {
      return state.app;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    userModule,
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
