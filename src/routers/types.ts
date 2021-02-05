import { RoleEnum } from '@/enums/RoleEnum';
import { Component } from '@/components/types';
import type { RouteRecordRaw } from 'vue-router';

export interface RouteMeta {
  // title
  title: string;
  // Whether to ignore permissions
  ignoreAuth?: boolean;
  // role info
  roles?: RoleEnum[];
  // Whether not to cache
  ignoreKeepAlive?: boolean;
  // Is it fixed on tab
  affix?: boolean;
  // icon on tab
  icon?: string;
  frameSrc?: string;
  // current page transition
  transitionName?: string;
  // Whether the route has been dynamically added
  hideBreadcrumb?: boolean;
  // Carrying parameters
  carryParam?: boolean;
  // Used internally to mark single-level menus
  single?: boolean;
  // Currently active menu
  currentActiveMenu?: string;
  // Never show in tab
  hideTab?: boolean;
  // Never show in menu
  hideMenu?: boolean;
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export type AppRouteModule = AppRouteRecordRaw;
