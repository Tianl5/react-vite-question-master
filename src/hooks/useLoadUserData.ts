import { getUserInfoService } from '@/axios/user'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import useGetUserInfo from './userGetUserInfo'
import { useDispatch } from 'react-redux'
import { loginReducer } from '@/store/userReducer'
const useLoadUserData = () => {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)

  // 加载用户信息
  const { run: requestUserData } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(res) {
      const { username, nickname } = res
      // 存储到redux store 中
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // 判断redux中当前是否已经获取到用户信息
  const { username } = useGetUserInfo() // redux store
  useEffect(() => {
    if (username) {
      // 如果redux store中已经存在用户信息，就不用重新加载了
      setWaitingUserData(false)
      return
    }
    requestUserData() // 如果redux store中没有，就加载
  }, [username])
  return { waitingUserData } // ajax加载完用户信息之后，放在redux中，不用返回
}

export default useLoadUserData
