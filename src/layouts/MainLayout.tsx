import * as React from 'react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import styles from './mainLayout.module.scss'
import Logo from '@/components/Logo/Logo'
import Userinfo from '@/components/Userinfo/Userinfo'
import useLoadUserData from '@/hooks/useLoadUserData'
import useNavPage from '@/hooks/useNavPage'
const { Header, Footer, Content } = Layout
const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  // 相当于vue的全局路由守卫作用
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <Userinfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.footer}>
        <div>智能问卷 &copy;2024 - present. Created by 夜云</div>
      </Footer>
    </Layout>
  )
}

export default MainLayout
