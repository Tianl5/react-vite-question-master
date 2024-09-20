import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import useGetUserInfo from '@/hooks/userGetUserInfo'
import { MANAGE_INDEX_PATHNAME, HOME_PATHNAME } from '@/router'

const { Title } = Typography
const Logo: FC = () => {
  const { username } = useGetUserInfo()

  const [pathname, setPathname] = useState(HOME_PATHNAME)

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [pathname])

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>智能问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
