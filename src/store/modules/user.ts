import { InjectionKey } from 'vue';
import { Module, Store, useStore as baseUseStore } from 'vuex';

import router from '/@/router';
import { RootStateTypes } from '/@/store/interface';
import { UserStateTypes } from '/@/store/interface';
import { CacheTypeEnum, TOKEN_KEY } from '/@/enums/cacheEnum';
import { useProjectSetting } from '/@/hooks/setting';
import { getLocal, getSession } from '/@/utils/helper/persistent';

const { permissionCacheType } = useProjectSetting();

function getCache<T>(key: string) {
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
  return fn(key) as T;
}
const userModule: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    name: '',
    token: '',
  },
  getters: {
    getTokenState(state): string {
      return state.token || getCache<string>(TOKEN_KEY);
    },
  },
  mutations: {
    async login(state, payload) {
      console.log('login:' + payload);
      // mutate state
      state.name = payload;
      await router.replace('/dashboard');
    },
  },
  actions: {
    login({ commit }, payload) {
      console.log('login:' + payload);
      commit('login', 'aaa');
    },
  },
};

export default userModule;

export const key: InjectionKey<Store<UserStateTypes>> = Symbol('userModule');

export function useUserStore<T = UserStateTypes>() {
  return baseUseStore<T>(key);
}
