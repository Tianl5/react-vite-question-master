/**
 * @description 存储/获取 user token
 * @author 夜云
 */

const KEY = `USER_TOKEN`

// 设置token
export const setToken = (token: string) => {
  localStorage.setItem(KEY, token)
}

// 获取token
export const getToken = (): string => {
  return localStorage.getItem(KEY) || ''
}
// 移除token
export const removeToken = () => {
  localStorage.removeItem(KEY)
}
