import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { GetterTypes, ActionTypes, MutationTypes } from './types';
import {
  RootStateTypes,
  UserStateTypes,
  UserGettersTypes,
  UserMutationsTypes,
  UserActionsTypes,
} from '/@/stores/interfaces';
import { loginApi } from '/@/api/user';

export const state: UserStateTypes = {
  token: '',
};

export const getters: GetterTree<UserStateTypes, RootStateTypes> & UserGettersTypes = {
  [GetterTypes.GET_TOKEN](state: UserStateTypes) {
    return state.token || '';
  },
};

export const mutations: MutationTree<UserStateTypes> & UserMutationsTypes = {
  [MutationTypes.SET_TOKEN](state: UserStateTypes, payload: string) {
    console.log(payload);
    state.token = payload;
  },
};
export const actions: ActionTree<UserStateTypes, RootStateTypes> & UserActionsTypes = {
  [ActionTypes.ACT_TOKEN]({ commit }, payload: string) {
    commit(MutationTypes.SET_TOKEN, payload);
  },
  async [ActionTypes.ACT_LOGIN]({ commit }, payload: any) {
    // todo login
    await loginApi(payload.param, payload.mode);
    commit(MutationTypes.SET_TOKEN, payload);
  },
};

// Module
const app: Module<UserStateTypes, RootStateTypes> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default app;
