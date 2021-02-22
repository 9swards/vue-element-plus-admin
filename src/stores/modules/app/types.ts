import {
  AppStateTypes,
  AppMutationsTypes,
  AppGettersTypes,
  AppActionsTypes,
} from '/@/stores/interfaces';
import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';

export type AppStoreModuleTypes<S = AppStateTypes> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  getters: {
    [K in keyof AppGettersTypes]: ReturnType<AppGettersTypes[K]>;
  };
} & {
  commit<K extends keyof AppMutationsTypes, P extends Parameters<AppMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<AppMutationsTypes[K]>;
} & {
  dispatch<K extends keyof AppActionsTypes>(
    key: K,
    payload?: Parameters<AppActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<AppActionsTypes[K]>;
};
