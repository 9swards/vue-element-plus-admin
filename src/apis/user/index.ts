import request from '@/apis'
import { AxiosRequestConfig } from 'axios'
import { useAxiosOption } from '@/apis'
import { IMenubarList } from '@/types/store/layout'

interface IApiRecord {
  [key: string]: AxiosRequestConfig
}

const apiList: IApiRecord = {
  login: {
    url: '/login',
    method: 'POST',
  },
  getRouterList: {
    url: '/getRouterList',
    method: 'GET',
  },
}

export interface LoginParam {
  username: string
  password: string
}

export function login(body: LoginParam) {
  const api: AxiosRequestConfig = apiList.login
  const { data } = useAxios(api.url, Object.assign(api, { data: body }), request, useAxiosOption)
  return data
}

export function getRouterList(): Array<IMenubarList> {
  const api: AxiosRequestConfig = apiList.login
  const { data } = useAxios(api.url, api, request, useAxiosOption)
  return data
}
