import axios from 'axios'
import { message } from 'antd'
import { getToken } from '@/utils/user-token'
export const baseUrl = '/fs'
const api = axios.create({
  timeout: 5 * 1000,
  baseURL: baseUrl,
})

// request 拦截
api.interceptors.request.use(
  (config) => {
    // 重定向

    // 跳过登录注册，无需token
    if (
      config.url === `${baseUrl}/api/auth/login` ||
      config.url === `${baseUrl}/api/user/register`
    ) {
      return config
    } else {
      config.headers['Authorization'] = `Bearer ${getToken()}` //JWT 固定格式
      return config
    }
  },
  (err) => {
    return Promise.reject(err)
  },
)

// 拦截器, 统一处理errno和msg
api.interceptors.response.use(
  (res) => {
    const resData = (res.data || {}) as ResType
    const { errno, msg, data } = resData
    if (errno !== 0) {
      if (msg) {
        message.error(msg)
      }
      throw new Error(msg)
    }
    return data as any
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default api

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
