import * as React from 'react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME, LOGIN_PATHNAME } from '@/router'
import styles from './Home.module.scss'
import useGetUserInfo from '@/hooks/userGetUserInfo'

const { Title, Paragraph } = Typography
const Home: FC = () => {
  const navigate = useNavigate()
  const { username } = useGetUserInfo()
  const handleNavigate = () => {
    username ? navigate(MANAGE_INDEX_PATHNAME) : navigate(LOGIN_PATHNAME)
  }
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布 90 份，收到 2400 个答卷</Paragraph>
        <div>
          <Button type="primary" onClick={handleNavigate}>
            开始使用
          </Button>
          {/* <Button onClick={() => navigate('/mobx')}>Mobx测试页面</Button>
          <Button onClick={() => navigate('/mobx-todoList')}>Mobx测试页面2</Button> */}
        </div>
      </div>
    </div>
  )
}

export default Home
