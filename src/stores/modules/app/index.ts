import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { GetterTypes, ActionTypes, MutationTypes } from './types';
import {
  AppStateTypes,
  AppGettersTypes,
  RootStateTypes,
  AppMutationsTypes,
  AppActionsTypes,
} from '/@/stores/interfaces';

export const state: AppStateTypes = {
  title: 'e+ admin',
};

export const getters: GetterTree<AppStateTypes, RootStateTypes> & AppGettersTypes = {
  [GetterTypes.GET_TITLE]: (state: AppStateTypes) => {
    return state.title || '';
  },
};

export const mutations: MutationTree<AppStateTypes> & AppMutationsTypes = {
  [MutationTypes.SET_TITLE](state: AppStateTypes, payload: string) {
    state.title = payload;
  },
};

export const actions: ActionTree<AppStateTypes, RootStateTypes> & AppActionsTypes = {
  [ActionTypes.ACT_TITLE]({ commit }, payload: string) {
    commit(MutationTypes.SET_TITLE, payload);
  },
};

// Module
const app: Module<AppStateTypes, RootStateTypes> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default app;
