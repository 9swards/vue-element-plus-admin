import { ActionContext } from 'vuex';
import { AppStoreModuleTypes } from './modules/app/types';
import { MutationTypes as AppMTypes } from '/@/stores/modules/app';
import { ActionTypes as AppATypes } from '/@/stores/modules/app';

// 定义模块
type StoreModules = {
  app: AppStoreModuleTypes;
};

export type Store = AppStoreModuleTypes<Pick<StoreModules, 'app'>>;

// 模块所有名称
export enum MODULES {
  APP_MODULE_NAME = 'appModule',
}

export interface RootStateTypes {
  app: string;
}

export interface AllStateTypes extends RootStateTypes {
  [MODULES.APP_MODULE_NAME]: AppStateTypes;
}

// app
export interface AppStateTypes {
  title: string;
}
export interface AppGettersTypes {
  getTitle(state: AppStateTypes): string;
}
export type AppMutationsTypes<S = AppStateTypes> = {
  [AppMTypes.SET_TITLE](state: S, payload: string): void;
};

export type AugmentedActionContext = Omit<
  ActionContext<AppStateTypes, RootStateTypes>,
  'commit'
> & {
  commit<K extends keyof AppMutationsTypes>(
    key: K,
    payload: Parameters<AppMutationsTypes[K]>[1]
  ): ReturnType<AppMutationsTypes[K]>;
};

export interface AppActionsTypes {
  [AppATypes.ACT_TITLE]({ commit }: AugmentedActionContext, payload: string): void;
}

// user
export interface UserStateTypes {
  name: string;
  token: string;
}

// permission
export interface PermissionStateTypes {
  permCodeListState: string[];
  isDynamicAddedRouteState: boolean;
  lastBuildMenuTimeState: number;
}
