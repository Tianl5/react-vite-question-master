import { LeftOutlined, SendOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Typography, Space, Input, message } from 'antd'
import { FC, useState, ChangeEvent } from 'react'
import styles from './EditHeader.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from '../EditToolbar/EditToolbar'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { updatePageTitle } from '@/store/pageInfoReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { updateQuestionService } from '@/axios/question'
import { useRequest, useKeyPress, useDebounceEffect } from 'ahooks'
import { QUESTION_STAT_PATHNAME } from '@/router'

const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()
  const [editState, setEditState] = useState<boolean>(false)

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(updatePageTitle(newTitle))
  }
  // 编辑状态
  if (editState) {
    return (
      <Input
        value={title}
        onPressEnter={() => setEditState(false)}
        onBlur={() => setEditState(false)}
        onChange={handleChangeTitle}
      />
    )
  }
  return (
    <Space>
      <Title>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

// 保存按钮
const SaveButton: FC = () => {
  // 保存pageInfo componentList 信息
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()

  // 保存请求
  const { run: saveQuestion, loading } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('保存成功')
      },
    },
  )

  // 快捷键
  useKeyPress(['ctrl.s', 'meta.s', 'alt.S'], (event: KeyboardEvent) => {
    // 禁用浏览器默认行为
    event.preventDefault()
    if (!loading) saveQuestion()
  })

  // 自动保存（不是定期保存，防抖10秒无操作后自动保存）
  useDebounceEffect(
    () => {
      saveQuestion()
    },
    [pageInfo, componentList],
    {
      wait: 10000,
    },
  )
  return (
    <Button onClick={saveQuestion} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

// 发布按钮
const PublishButton: FC = () => {
  // 保存pageInfo componentList 信息
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  const navigate = useNavigate()
  const { run: publishQuestion, loading } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, // 问卷已经被发布
      })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('发布成功')
        // 发布成功跳转到统计页面
        navigate(`${QUESTION_STAT_PATHNAME}/${id}`)
      },
    },
  )
  return (
    <Button type="primary" icon={<SendOutlined />} disabled={loading} onClick={publishQuestion}>
      发布
    </Button>
  )
}
// 编辑器头部
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
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
