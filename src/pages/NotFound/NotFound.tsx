import * as React from 'react'
import { FC } from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { HOME_PATHNAME } from '@/router'
const NotFound: FC = () => {
  const navigate = useNavigate()
  const gotoHome = () => {
    navigate(HOME_PATHNAME)
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Button type="primary" onClick={gotoHome}>
          返回首页
        </Button>
      }
    ></Result>
  )
}

export default NotFound
