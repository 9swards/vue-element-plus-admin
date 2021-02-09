import { Module } from 'vuex';
import router from '/@/routers';
import { RootStateTypes } from '/@/stores/interface';
import { UserStateTypes } from '/@/stores/modules/interface';

const userModule: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    name: '',
  },
  getters: {},
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
