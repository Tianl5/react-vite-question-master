import { LeftOutlined, CheckOutlined, SendOutlined } from '@ant-design/icons'
import { Button, Typography, Space } from 'antd'
import { FC } from 'react'
import styles from './EditHeader.module.scss'
import { useNavigate } from 'react-router-dom'
import EditToolbar from '../EditToolbar/EditToolbar'
const { Title } = Typography
const EditHeader: FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<CheckOutlined />}>保存</Button>
            <Button type="primary" icon={<SendOutlined />}>
              发布
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
