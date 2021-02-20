import { InjectionKey, toRaw } from 'vue';
import { Module, Store, useStore as baseUseStore } from 'vuex';
import { ElLoading } from 'element-plus';

import type { AppRouteRecordRaw, Menu } from '/@/router/types';

import { useAppStore } from '/@/store/modules/app';
import { useUserStore } from '/@/store/modules/user';

import { PermissionStateTypes, RootStateTypes } from '/@/store/interface';
import { asyncRoutes } from '/@/router/routes';
import { transformObjToRoute } from '/@/router/helper/routeHelper';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/constant';

import { PermissionModeEnum } from '/@/enums/appEnum';

import { getMenuListById } from '/@/api/menu';
import { filter } from '/@/utils/helper/treeHelper';

const appStore = useAppStore();
const userStore = useUserStore();

const permissionModule: Module<PermissionStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    permCodeListState: [],
    isDynamicAddedRouteState: false,
    lastBuildMenuTimeState: 0,
    backMenuListState: [],
  },
  getters: {
    getPermCodeListState(state) {
      return state.permCodeListState;
    },
    getBackMenuListState(state) {
      return state.backMenuListState;
    },
    getLastBuildMenuTimeState(state) {
      return state.lastBuildMenuTimeState;
    },
    getIsDynamicAddedRouteState(state) {
      return state.isDynamicAddedRouteState;
    },
  },

  mutations: {
    commitPermCodeListState(state, codeList: string[]): void {
      state.permCodeListState = codeList;
    },

    commitBackMenuListState(state, list: Menu[]): void {
      state.backMenuListState = list;
    },

    commitLastBuildMenuTimeState(state): void {
      state.lastBuildMenuTimeState = new Date().getTime();
    },

    commitDynamicAddedRouteState(state, added: boolean): void {
      state.isDynamicAddedRouteState = added;
    },

    commitResetState(state): void {
      state.isDynamicAddedRouteState = false;
      state.permCodeListState = [];
      state.backMenuListState = [];
      state.lastBuildMenuTimeState = 0;
    },
  },

  actions: {
    async buildRoutesAction({ commit }, id?: number | string): Promise<AppRouteRecordRaw[]> {
      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getters.getRoleListState);

      const { permissionMode } = appStore.getters.getProjectConfig;

      // role permissions
      if (permissionMode === PermissionModeEnum.ROLE) {
        routes = filter(asyncRoutes, (route) => {
          const { meta } = route as AppRouteRecordRaw;
          const { roles } = meta || {};
          if (!roles) return true;
          return roleList.some((role) => roles.includes(role));
        });
        //  如果确定不需要做后台动态权限,请将下面整个判断注释
      } else if (permissionMode === PermissionModeEnum.BACK) {
        ElLoading.service({
          text: '加载中',
        });
        // 这里获取后台路由菜单逻辑自行修改
        const paramId = id || userStore.getters.getUserInfoState.userId;
        if (!paramId) {
          throw new Error('paramId is undefined!');
        }
        let routeList = (await getMenuListById({ id: paramId })) as AppRouteRecordRaw[];

        // 动态引入组件
        routeList = transformObjToRoute(routeList);
        //  后台路由转菜单结构
        const backMenuList = transformRouteToMenu(routeList);

        commit('commitBackMenuListState', backMenuList);

        routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
      }
      return routes;
    },
  },
};

export default permissionModule;

export const key: InjectionKey<Store<PermissionStateTypes>> = Symbol('permissionModule');

export function usePermissionStore<T = PermissionStateTypes>() {
  return baseUseStore<T>(key);
}
