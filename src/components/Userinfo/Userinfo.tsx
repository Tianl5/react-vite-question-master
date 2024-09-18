import * as React from 'react'
import { FC } from 'react'
import styles from './Userinfo.module.scss'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router'
const Userinfo: FC = () => {
  // 对于已经登陆的用户显示什么，以后在做
  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )
}

export default Userinfo
