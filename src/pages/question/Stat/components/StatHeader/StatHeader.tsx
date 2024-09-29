import useGetPageInfo from '@/hooks/useGetPageInfo'
import { QUESTION_EDIT_PATHNAME } from '@/router'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, Space, Typography, Input, Tooltip, InputRef, message, Popover } from 'antd'
import { FC, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './StatHeader.module.scss'
import QRCode from 'qrcode.react'
const { Title } = Typography
const StatHeader: FC = () => {
  const navigate = useNavigate()
  const { title, isPublished } = useGetPageInfo()
  const { id } = useParams()

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null)
  // 复制
  const copy = () => {
    const elem = urlInputRef.current
    if (elem == null) return

    elem.select() // 选中 input 的内容
    document.execCommand('copy') // 复制选中内容
    message.success('复制成功')
  }

  // 生成链接和 二维码
  const genLinkAndQRCodeElem = () => {
    if (!isPublished) return null

    const url = `http://localhost:3000/question/${id}` // 拼接url 参考的是c端的url

    // 定义二维码组件
    const QRCodeElem = () => {
      return (
        <div style={{ textAlign: 'center' }}>
          <QRCode value={url} size={150} />
        </div>
      )
    }
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy} />
        </Tooltip>
        <Popover content={<QRCodeElem />}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => navigate(`${QUESTION_EDIT_PATHNAME}/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
