export interface IAuth {
  // 用户信息
  userInfo: {
    name?: string
    accessToken?: string | undefined
  }
}
