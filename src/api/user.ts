import { defHttp } from '/@/plugins/axios';
import { LoginParams, LoginResultModel } from './models/userModel';
import { ErrorMessageMode } from '/@/plugins/axios/types';

enum Api {
  Login = '/login',
  GetUserInfoById = '/getUserInfoById',
  GetPermCodeByUserId = '/getPermCodeByUserId',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.request<LoginResultModel>(
    {
      url: Api.Login,
      method: 'POST',
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}
