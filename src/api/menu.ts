import { defHttp } from '/@/utils/http';

import { getMenuListByIdParams, getMenuListByIdParamsResultModel } from './models/menuModel';

enum Api {
  GetMenuListById = '/getMenuListById',
}

/**
 * @description: Get user menu based on id
 */
export function getMenuListById(params: getMenuListByIdParams) {
  return defHttp.request<getMenuListByIdParamsResultModel>({
    url: Api.GetMenuListById,
    method: 'GET',
    params,
  });
}
