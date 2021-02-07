import { Module } from 'vuex';
import { RootStateTypes } from '@/stores/interface';
import { UserStateTypes } from '@/stores/modules/interface';

const userModule: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    name: '',
  },
  getters: {},
  mutations: {
    login(state, payload) {
      console.log('login:' + payload);
      // mutate state
      state.name = payload;
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
