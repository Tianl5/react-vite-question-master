import api, { ResDataType } from './index'

// 获取用户信息
export const getUserInfoService = async (): Promise<ResDataType> => {
  return (await api.get(`/api/auth/profile`)) as ResDataType
}

// 用户注册
export const registerService = async (
  username: string,
  password: string,
  nickName?: string,
): Promise<ResDataType> => {
  return (await api.post(`/api/user/register`, {
    username,
    password,
    nickName: nickName || username,
  })) as ResDataType
}

// 用户登录

export const loginService = async (username: string, password: string): Promise<ResDataType> => {
  return (await api.post(`/api/auth/login`, {
    username,
    password,
  })) as ResDataType
}
