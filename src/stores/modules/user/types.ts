import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';
import {
  UserStateTypes,
  UserGettersTypes,
  UserMutationsTypes,
  UserActionsTypes,
} from '../../interfaces';

export enum GetterTypes {
  GET_TOKEN = `GET_TOKEN`,
}
export enum MutationTypes {
  SET_TOKEN = `SET_TOKEN`,
}
export enum ActionTypes {
  ACT_TOKEN = 'ACT_TOKEN',
  ACT_LOGIN = 'ACT_LOGIN',
}

export type UserStoreModuleTypes<S = UserStateTypes> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  getters: {
    [K in keyof UserGettersTypes]: ReturnType<UserGettersTypes[K]>;
  };
} & {
  commit<K extends keyof UserMutationsTypes, P extends Parameters<UserMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<UserMutationsTypes[K]>;
} & {
  dispatch<K extends keyof UserActionsTypes>(
    key: K,
    payload?: Parameters<UserActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<UserActionsTypes[K]>;
};
