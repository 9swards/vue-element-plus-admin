import type { RouteLocationNormalized } from 'vue-router';
import { Menu } from '/@/router/types';
import { ErrorTypeEnum } from '/@/enums/exceptionEnum';

export interface RootStateTypes {
  app: string;
}

export interface AllStateTypes extends RootStateTypes {
  appModule: AppStateTypes;
  userModule: UserStateTypes;
  permissionModule: PermissionStateTypes;
  errorModule: ErrorStateTypes;
}

// app
export interface AppStateTypes {
  title: '';
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
  backMenuListState: Menu[];
}

// error
export interface ErrorStateTypes {
  errorInfoState: ErrorInfo[] | null;
  errorListCountState: number;
}
export interface ErrorInfo {
  type: ErrorTypeEnum;
  file: string;
  name?: string;
  message: string;
  stack?: string;
  detail: string;
  url: string;
  time?: string;
}
// lock
export interface LockStateTypes {
  lockInfoState: LockInfo;
}
export interface LockInfo {
  pwd: string | undefined;
  isLock: boolean;
}

// tab
export interface TabStateTypes {
  cachedMapState: Map<string, string[]>;
  // tab list
  tabsState: RouteLocationNormalized[];
  lastDragEndIndexState: number;
}
