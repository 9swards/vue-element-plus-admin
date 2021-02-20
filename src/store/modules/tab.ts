import { InjectionKey, toRaw, unref } from 'vue';
import { Module, Store, useStore as baseUseStore } from 'vuex';
import { cloneDeep } from 'lodash-es';

import { PageEnum } from '/@/enums/pageEnum';
import router from '/@/router';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/constant';
import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
import { getRoute } from '/@/router/helper/routeHelper';
import { useGo, useRedo } from '/@/hooks/web/usePage';
import { TabStateTypes, RootStateTypes } from '/@/store/interface';

export const PAGE_LAYOUT_KEY = '__PAGE_LAYOUT__';

function isGotoPage() {
  const go = useGo();
  go(unref(router.currentRoute).path, true);
}

const tabModule: Module<TabStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    cachedMapState: new Map<string, string[]>(),
    // tab list
    tabsState: [] as RouteLocationNormalized[],
    lastDragEndIndexState: 0,
  },

  getters: {
    getTabsState(state) {
      return state.tabsState;
    },

    getCurrentTab(state): RouteLocationNormalized {
      const route = unref(router.currentRoute);
      return state.tabsState.find((item) => item.path === route.path)!;
    },

    getCachedMapState(state): Map<string, string[]> {
      return state.cachedMapState;
    },

    getLastDragEndIndexState(state): number {
      return state.lastDragEndIndexState;
    },
  },
  mutations: {
    commitClearCache(state): void {
      state.cachedMapState = new Map();
    },
    goToPage() {
      const go = useGo();
      const len = this.tabsState.length;
      const { path } = unref(router.currentRoute);

      let toPath: PageEnum | string = PageEnum.BASE_HOME;

      if (len > 0) {
        const page = this.tabsState[len - 1];
        const p = page.fullPath || page.path;
        if (p) {
          toPath = p;
        }
      }
      // Jump to the current page and report an error
      path !== toPath && go(toPath as PageEnum, true);
    },
    commitCachedMapState(state): void {
      const cacheMap = new Map<string, string[]>();

      const pageCacheSet = new Set<string>();
      state.tabsState.forEach((tab) => {
        const item = getRoute(tab);
        const needCache = !item.meta?.ignoreKeepAlive;
        if (!needCache) return;

        if (item.meta?.affix) {
          const name = item.name as string;
          pageCacheSet.add(name);
        } else if (item?.matched && needCache) {
          const matched = item?.matched;
          if (!matched) return;
          const len = matched.length;

          if (len < 2) return;

          for (let i = 0; i < matched.length; i++) {
            const key = matched[i].name as string;

            if (i < 2) {
              pageCacheSet.add(key);
            }
            if (i < len - 1) {
              const { meta, name } = matched[i + 1];
              if (meta && (meta.affix || needCache)) {
                const mapList = cacheMap.get(key) || [];
                if (!mapList.includes(name as string)) {
                  mapList.push(name as string);
                }
                cacheMap.set(key, mapList);
              }
            }
          }
        }
      });

      cacheMap.set(PAGE_LAYOUT_KEY, Array.from(pageCacheSet));
      state.cachedMapState = cacheMap;
    },
    commitTabRoutesState(state, route: RouteLocationNormalized) {
      const { path, fullPath, params, query } = route;

      let updateIndex = -1;
      // 已经存在的页面，不重复添加tab
      const hasTab = state.tabsState.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });
      if (hasTab) {
        const curTab = toRaw(this.tabsState)[updateIndex];
        if (!curTab) return;
        curTab.params = params || curTab.params;
        curTab.query = query || curTab.query;
        curTab.fullPath = fullPath || curTab.fullPath;
        state.tabsState.splice(updateIndex, 1, curTab);
        return;
      }
      state.tabsState = cloneDeep([...state.tabsState, route]);
    },
    commitCloseTab(state, route: RouteLocationNormalized): void {
      const { fullPath, meta: { affix } = {} } = route;
      if (affix) return;
      const index = state.tabsState.findIndex((item) => item.fullPath === fullPath);
      index !== -1 && state.tabsState.splice(index, 1);
    },
    commitCloseAllTab(state): void {
      state.tabsState = state.tabsState.filter((item) => {
        return item.meta && item.meta.affix;
      });
    },
    commitResetState(state): void {
      state.tabsState = [];
      state.cachedMapState = new Map();
    },
    commitSortTabs(state, { oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void {
      const currentTab = this.tabsState[oldIndex];

      state.tabsState.splice(oldIndex, 1);
      state.tabsState.splice(newIndex, 0, currentTab);
      state.lastDragEndIndexState = state.lastDragEndIndexState + 1;
    },
    closeMultipleTab(state, { pathList }: { pathList: string[] }): void {
      state.tabsState = toRaw(state.tabsState).filter((item) => !pathList.includes(item.fullPath));
    },
    async commitRedoPage(state) {
      const route = router.currentRoute.value;
      for (const [key, value] of state.cachedMapState) {
        const index = value.findIndex((item) => item === (route.name as string));
        if (index === -1) {
          continue;
        }
        if (value.length === 1) {
          state.cachedMapState.delete(key);
          continue;
        }
        value.splice(index, 1);
        state.cachedMapState.set(key, value);
      }
      const redo = useRedo();
      await redo();
    },
  },
  actions: {
    addTabAction({ commit }, route: RouteLocationNormalized) {
      const { path, name } = route;
      // 404  The page does not need to add a tab
      if (
        path === PageEnum.ERROR_PAGE ||
        !name ||
        [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name as string)
      ) {
        return;
      }
      commit('commitTabRoutesState', getRoute(route));

      commit('commitCachedMapState');
    },
    closeAllTabAction({ commit }) {
      commit('commitCloseAllTab');
      commit('commitClearCache');
      commit('goToPage');
    },
    closeTabAction({ commit, getters }, tab: RouteLocationNormalized) {
      function getObj(tabItem: RouteLocationNormalized) {
        const { params, path, query } = tabItem;
        return {
          params: params || {},
          path,
          query: query || {},
        };
      }
      const { currentRoute, replace } = router;

      const { path } = unref(currentRoute);
      if (path !== tab.path) {
        // Closed is not the activation tab
        commit('commitCloseTab', tab);
        return;
      }

      // Closed is activated atb
      let toObj: RouteLocationRaw = {};

      const index = getters.getTabsState.findIndex((item) => item.path === path);

      // If the current is the leftmost tab
      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (getters.getTabsState.length === 1) {
          toObj = PageEnum.BASE_HOME;
        } else {
          //  Jump to the right tab
          const page = getters.getTabsState[index + 1];
          toObj = getObj(page);
        }
      } else {
        // Close the current tab
        const page = getters.getTabsState[index - 1];
        toObj = getObj(page);
      }
      commit('commitCloseTab', currentRoute.value);
      replace(toObj);
    },

    closeTabByKeyAction({ state, dispatch }, key: string) {
      const index = state.tabsState.findIndex((item) => (item.fullPath || item.path) === key);
      index !== -1 && dispatch('closeTabAction', state.tabsState[index]);
    },

    closeLeftTabAction({ commit, state }, route: RouteLocationNormalized): void {
      const index = state.tabsState.findIndex((item) => item.path === route.path);

      if (index > 0) {
        const leftTabs = state.tabsState.slice(0, index);
        const pathList: string[] = [];
        for (const item of leftTabs) {
          const affix = item.meta ? item.meta.affix : false;
          if (!affix) {
            pathList.push(item.fullPath);
          }
        }
        commit('closeMultipleTab', { pathList });
      }
      commit('commitCachedMapState');
      isGotoPage();
    },

    closeRightTabAction({ commit, state }, route: RouteLocationNormalized): void {
      const index = state.tabsState.findIndex((item) => item.fullPath === route.fullPath);

      if (index >= 0 && index < state.tabsState.length - 1) {
        const rightTabs = state.tabsState.slice(index + 1, state.tabsState.length);

        const pathList: string[] = [];
        for (const item of rightTabs) {
          const affix = item.meta ? item.meta.affix : false;
          if (!affix) {
            pathList.push(item.fullPath);
          }
        }
        commit('closeMultipleTab', { pathList });
      }
      commit('commitCachedMapState');
      isGotoPage();
    },

    closeOtherTabAction({ commit, state }, route: RouteLocationNormalized): void {
      const closePathList = state.tabsState.map((item) => item.fullPath);
      const pathList: string[] = [];
      closePathList.forEach((path) => {
        if (path !== route.fullPath) {
          const closeItem = state.tabsState.find((item) => item.path === path);
          if (!closeItem) return;
          const affix = closeItem.meta ? closeItem.meta.affix : false;
          if (!affix) {
            pathList.push(closeItem.fullPath);
          }
        }
      });
      commit('closeMultipleTab', { pathList });
      commit('commitCachedMapState');
      isGotoPage();
    },
  },
};
export default tabModule;

export const key: InjectionKey<Store<TabStateTypes>> = Symbol('tabModule');

export function useTabStore<T = TabStateTypes>() {
  return baseUseStore<T>(key);
}
