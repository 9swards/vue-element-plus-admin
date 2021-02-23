export interface GlobleConfig {
  // 网站标题
  title: string;
  // 项目路径
  apiUrl: string;
  uploadUrl?: string;
  urlPrefix?: string;
  shortName: string;
}
export interface GlobleEnvConfig {
  // 网站标题
  VITE_GLOBLE_APP_TITLE: string;
  // 项目路径
  VITE_GLOBLE_API_URL: string;
  VITE_GLOBLE_API_URL_PREFIX?: string;
  VITE_GLOBLE_APP_SHORT_NAME: string;
  VITE_GLOBLE_UPLOAD_URL?: string;
}

interface GlobleWrap {
  globleSetting: Readonly<GlobConfig>;
}
