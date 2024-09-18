import axios from 'axios'
import { message } from 'antd'

export const baseUrl = '/fs'
export const proxyRewrite = 'fs'
const api = axios.create({
  timeout: 5 * 1000,
})

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
