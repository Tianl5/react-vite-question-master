import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  MANAGE_INDEX_PATHNAME,
  LOGIN_PATHNAME,
} from '@/router'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './userGetUserInfo'

const useNavPage = (waitingUserData: boolean) => {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    // 已经登录
    if (username) {
      // 如果是在登录页或者是注册页
      if (isLoginOrRegister(pathname)) {
        // 跳转到我的问卷
        navigate(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    // 未登录
    if (!isNoNeedUserInfo(pathname)) {
      navigate(LOGIN_PATHNAME)
    }
  }, [username, pathname, waitingUserData])
}

export default useNavPage
