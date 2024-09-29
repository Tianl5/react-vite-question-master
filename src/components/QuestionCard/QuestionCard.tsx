import * as React from 'react'
import { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Modal, message } from 'antd'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '@/axios/question'
import { useRequest } from 'ahooks'
import { QUESTION_EDIT_PATHNAME, QUESTION_STAT_PATHNAME } from '@/router'

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createAt: string
}
const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const { _id, title, isStar, isPublished, answerCount, createAt } = props
  const navigate = useNavigate()
  const { confirm } = Modal

  // 修改标星
  const [isStarState, setIsStarState] = useState<Boolean>(isStar)
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('已更新')
      },
    },
  )

  const { loading: duplicateLoading, run: duplicateRun } = useRequest(
    async () => {
      return await duplicateQuestionService(_id)
    },
    {
      manual: true,
      onSuccess(res: any) {
        message.success('复制成功')
        navigate(`${QUESTION_EDIT_PATHNAME}/${res.id || res._id}`)
      },
    },
  )
  const duplicate = () => {
    confirm({
      title: '确定复制该问卷？',
      icon: <ExclamationCircleFilled />,
      content: '确定复制该问卷？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        duplicateRun()
      },
    })
  }

  // 假删除前端
  const [isDeleted, setIsDeleted] = useState<Boolean>(false)
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => {
      return await updateQuestionService(_id, { isDeleted: true })
    },
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        setIsDeleted(true)
      },
    },
  )
  // 删除成功
  const del = () => {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleFilled />,
      content: '问卷删除后无法恢复，请谨慎操作！',
      okText: '确定',
      cancelText: '取消',
      onOk: deleteQuestion,
    })
  }

  // 已经删除的问卷，不要再渲染卡片了
  if (isDeleted) return null
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷：{answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      {/* 分割线 */}
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined></EditOutlined>}
              type="text"
              size="small"
              disabled={changeStarLoading}
              onClick={() => navigate(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined></LineChartOutlined>}
              type="text"
              size="small"
              disabled={!isPublished}
              onClick={() => navigate(`${QUESTION_STAT_PATHNAME}/${_id}`)}
            >
              数据统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              type="text"
              size="small"
              icon={<StarOutlined></StarOutlined>}
              onClick={changeStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Button
              type="text"
              size="small"
              icon={<CopyOutlined></CopyOutlined>}
              disabled={duplicateLoading}
              onClick={duplicate}
            >
              复制
            </Button>
            {/* <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" size="small" icon={<CopyOutlined></CopyOutlined>}>
                复制
              </Button>
            </Popconfirm> */}
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined></DeleteOutlined>}
              disabled={deleteLoading}
              onClick={del}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
