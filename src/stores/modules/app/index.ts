import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
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
  getTitle: (state: AppStateTypes) => {
    return state.title || '';
  },
};

export enum MutationTypes {
  SET_TITLE = `SET_TITLE`,
}
export const mutations: MutationTree<AppStateTypes> & AppMutationsTypes = {
  [MutationTypes.SET_TITLE](state: AppStateTypes, payload: string) {
    state.title = payload;
  },
};

export enum ActionTypes {
  ACT_TITLE = 'ACT_TITLE',
}
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
