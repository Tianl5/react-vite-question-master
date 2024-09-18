import * as React from 'react'
import { FC, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_INDEX_PATHNAME } from '@/router'
import styles from './Home.module.scss'
const { Title, Paragraph } = Typography
// import '@/_mock/index.ts'
// import axios from 'axios'
const Home: FC = () => {
  const navigate = useNavigate()

  // useEffect(() => {
  //   // mock.js 只能劫持XMLHttpRequest 请求，无法劫持 fetch 请求
  //   // fetch('/api/test')
  //   //   .then((res) => res.json())
  //   //   .then((res) => {
  //   //     console.log(res, 88888)
  //   //   })

  //   // axios XMLHttpRequest
  //   axios.get('/api/test').then((res) => {
  //     console.log(res)
  //   })
  // }, [])

  // axios.get('/api/test').then((res) => {
  //   console.log(res)
  // })
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布 90 份，收到 2400 个答卷</Paragraph>
        <div>
          <Button type="primary" onClick={() => navigate(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
