/**
 * Application configuration
 */

import { merge } from 'lodash-es';

import type { ProjectConfig } from '/@/types/config';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { getLocal } from '/@/utils/helper/persistent';
import { useAppStore } from '/@/store/modules/app';

const { commit } = useAppStore();
// Initial project configuration
export function initAppConfigStore() {
  let projCfg: ProjectConfig = getLocal(PROJ_CFG_KEY) as ProjectConfig;
  projCfg = merge(projectSetting, projCfg || {});
  commit('commitProjectConfigState', projCfg);
}
