import { InjectionKey } from 'vue';
import { Module, Store, useStore as baseUseStore } from 'vuex';

import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { setLocal, getLocal, removeLocal } from '/@/utils/helper/persistent';
import { LockInfo, LockStateTypes, RootStateTypes } from '/@/store/interface';
import { useUserStore } from './user';

const { getters, dispatch } = useUserStore();

const lockModule: Module<LockStateTypes, RootStateTypes> = {
  namespaced: true,
  // lock info
  state: {
    lockInfoState: getLocal(LOCK_INFO_KEY) as LockInfo,
  },
  getters: {
    getLockInfo(state): LockInfo {
      return state.lockInfoState || ({} as LockInfo);
    },
  },

  mutations: {
    commitLockInfoState(state, info: LockInfo): void {
      state.lockInfoState = Object.assign({}, this.lockInfoState, info);
      setLocal(LOCK_INFO_KEY, this.lockInfoState);
    },
    resetLockInfo(state): void {
      removeLocal(LOCK_INFO_KEY);
      state.lockInfoState = {} as LockInfo;
    },
  },

  /**
   * @description: unlock page
   */
  actions: {
    async unLockAction({ commit, state }, { password }: { password: string }) {
      const tryLogin = async () => {
        try {
          const username = getters.getUserInfoState.username;
          const res = await dispatch('login', { username, password, goHome: false, mode: 'none' });
          if (res) {
            commit('resetLockInfo');
          }
          return res;
        } catch (error) {
          return false;
        }
      };

      if (state.lockInfoState?.pwd === password) {
        commit('resetLockInfo');
        return true;
      }
      return await tryLogin();
    },
  },
};

export default lockModule;

export const key: InjectionKey<Store<LockStateTypes>> = Symbol('lockModule');

export function useLockStore<T = LockStateTypes>() {
  return baseUseStore<T>(key);
}
