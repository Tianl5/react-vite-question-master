import api, { ResDataType, baseUrl } from './index'

// 获取用户信息
export const getUserInfoService = async (): Promise<ResDataType> => {
  return (await api.get(`${baseUrl}/api/user/info`)) as ResDataType
}

// 用户注册
export const registerService = async (
  username: string,
  password: string,
  nickName?: string,
): Promise<ResDataType> => {
  return (await api.post(`${baseUrl}/api/user/register`, {
    username,
    password,
    nickName: nickName || username,
  })) as ResDataType
}

// 用户登录

export const loginService = async (username: string, password: string): Promise<ResDataType> => {
  return (await api.post(`${baseUrl}/api/user/login`, {
    username,
    password,
  })) as ResDataType
}
