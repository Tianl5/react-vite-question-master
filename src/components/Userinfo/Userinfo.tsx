import * as React from 'react'
import { FC } from 'react'
import styles from './Userinfo.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router'
// import { getUserInfoService } from '@/axios/user'
// import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { message, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { removeToken } from '@/utils/user-token'
import useGetUserInfo from '@/hooks/userGetUserInfo'
import { logoutReducer } from '@/store/userReducer'
const Userinfo: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { username, nickname } = useGetUserInfo() || {}

  // 退出登录
  const logOut = () => {
    dispatch(logoutReducer()) // 清空了redux user数据
    removeToken() // 清除token
    navigate(LOGIN_PATHNAME)
    message.success('退出成功')
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logOut}>
        退出
      </Button>
    </>
  )

  const Login = (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )
  return <div>{username ? UserInfo : Login}</div>
}

export default Userinfo
