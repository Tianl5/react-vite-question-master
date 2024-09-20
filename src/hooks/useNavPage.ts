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
  // console.log(username, 'username')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  // console.log(waitingUserData, 'waitingUserData123222')
  useEffect(() => {
    // console.log(username, 'username')
    // console.log(pathname, 'pathname')
    // console.log(waitingUserData, 'waitingUserData')
    // if (waitingUserData && !username) {
    //   navigate(LOGIN_PATHNAME)
    //   return
    // }
    if (waitingUserData) {
      return
    }
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
  }, [username, pathname])
}

export default useNavPage
