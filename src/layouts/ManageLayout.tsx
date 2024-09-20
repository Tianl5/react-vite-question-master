import * as React from 'react'
import { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons'
import { createQuestionService } from '@/axios/question'
import { useRequest } from 'ahooks'
const ManageLayout: FC = () => {
  const navigate = useNavigate()
  // 获取当前路由路径
  const { pathname } = useLocation()

  const {
    loading,
    // error,
    run: handleCreateQuestion,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess: (res) => {
      if (res.id) {
        navigate(`/question/edit/${res.id}`)
        message.success('问卷创建成功')
      }
    },
  })
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            disabled={loading}
            onClick={handleCreateQuestion}
          >
            新建问卷
          </Button>
          <Divider />
          {/* <Divider style={{ borderTop: 'transparent' }} /> */}
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => navigate('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => navigate('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => navigate('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
