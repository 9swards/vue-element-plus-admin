import { ActionContext } from 'vuex';
import {
  GetterTypes as AppGTypes,
  MutationTypes as AppMTypes,
  ActionTypes as AppATypes,
  AppStoreModuleTypes,
} from './modules/app/types';
import {
  GetterTypes as UserGTypes,
  MutationTypes as UserMTypes,
  ActionTypes as UserATypes,
  UserStoreModuleTypes,
} from './modules/user/types';

// 模块所有名称
export enum MODULES {
  APP_MODULE_NAME = 'appModule',
  USER_MODULE_NAME = 'userModule',
}

// 定义模块
type StoreModules = {
  [MODULES.APP_MODULE_NAME]: AppStoreModuleTypes;
  [MODULES.USER_MODULE_NAME]: UserStoreModuleTypes;
};

export interface AllStateTypes extends RootStateTypes {
  [MODULES.APP_MODULE_NAME]: AppStateTypes;
  [MODULES.USER_MODULE_NAME]: UserStateTypes;
}

/*
    根store类型
*/
export type Store = AppStoreModuleTypes<Pick<StoreModules, MODULES.APP_MODULE_NAME>> &
  UserStoreModuleTypes<Pick<StoreModules, MODULES.USER_MODULE_NAME>>;

export interface RootStateTypes {
  app: string;
}

// app
export interface AppStateTypes {
  title: string;
}
export interface AppGettersTypes {
  [AppGTypes.GET_TITLE](state: AppStateTypes): string;
}
export type AppMutationsTypes<S = AppStateTypes> = {
  [AppMTypes.SET_TITLE](state: S, payload: string): void;
};

export interface AppActionsTypes {
  [AppATypes.ACT_TITLE]({ commit }: AppActionContext, payload: string): void;
}

export type AppActionContext = Omit<ActionContext<AppStateTypes, RootStateTypes>, 'commit'> & {
  commit<K extends keyof AppMutationsTypes>(
    key: K,
    payload: Parameters<AppMutationsTypes[K]>[1]
  ): ReturnType<AppMutationsTypes[K]>;
};

// user
export interface UserStateTypes {
  token: string;
}
export interface UserGettersTypes {
  [UserGTypes.GET_TOKEN](state: UserStateTypes): string;
}
export type UserMutationsTypes<S = UserStateTypes> = {
  [UserMTypes.SET_TOKEN](state: S, payload: string): void;
};
export interface UserActionsTypes {
  [UserATypes.ACT_TOKEN]({ commit }: UserActionContext, payload: string): void;
}
export type UserActionContext = Omit<ActionContext<UserStateTypes, RootStateTypes>, 'commit'> & {
  commit<K extends keyof UserMutationsTypes>(
    key: K,
    payload: Parameters<UserMutationsTypes[K]>[1]
  ): ReturnType<UserMutationsTypes[K]>;
};

// permission
export interface PermissionStateTypes {
  permCodeListState: string[];
  isDynamicAddedRouteState: boolean;
  lastBuildMenuTimeState: number;
}

// export all
export interface StoreGetters extends AppGettersTypes, UserGettersTypes {}
export interface StoreActions extends AppActionsTypes, UserActionsTypes {}
export interface StoreMutations extends AppMutationsTypes, UserMutationsTypes {}
