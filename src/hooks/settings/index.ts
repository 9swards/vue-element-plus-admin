import type { GlobleConfig, GlobleEnvConfig } from '/@/types/config';

import { getShortName } from '../../../build/utils';
import { warn } from '/@/utils/log';
import { getGlobEnvConfig, isDevMode } from '/@/utils/env';

const reg = /[a-zA-Z\_]*/;

const ENV_NAME = getShortName(import.meta.env);
const ENV = ((isDevMode()
  ? getGlobEnvConfig()
  : window[ENV_NAME as any]) as unknown) as GlobleEnvConfig;

const {
  VITE_GLOBLE_APP_TITLE,
  VITE_GLOBLE_API_URL,
  VITE_GLOBLE_APP_SHORT_NAME,
  VITE_GLOBLE_API_URL_PREFIX,
  VITE_GLOBLE_UPLOAD_URL,
} = ENV;

if (!reg.test(VITE_GLOBLE_APP_SHORT_NAME)) {
  warn(
    `VITE_GLOBLE_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
  );
}

export const useGlobSetting = (): Readonly<GlobleConfig> => {
  // Take global configuration
  const glob: Readonly<GlobleConfig> = {
    title: VITE_GLOBLE_APP_TITLE,
    apiUrl: VITE_GLOBLE_API_URL,
    shortName: VITE_GLOBLE_APP_SHORT_NAME,
    urlPrefix: VITE_GLOBLE_API_URL_PREFIX,
    uploadUrl: VITE_GLOBLE_UPLOAD_URL,
  };
  return glob as Readonly<GlobleConfig>;
};
