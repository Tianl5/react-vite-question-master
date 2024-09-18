import * as React from 'react'
import { FC, useState } from 'react'
import styles from '../scss/common.module.scss'
import { useTitle, useRequest } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '@/components/ListSearch/ListSearch'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListPagination from '@/components/ListPagination/ListPagination'
import { updateQuestionService, deleteQuestionService } from '@/axios/question'
const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('智能问卷 - 回收站')
  // 记录选中的行
  const [selectedRow, setSelectdRowKey] = useState<object[]>([])
  // 获取列表
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
  const columnQuestionList = [
    {
      title: '问卷名称',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color={'processing'}>已发布</Tag> : <Tag>未发布</Tag>,
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
    },
  ]

  // 批量删除
  const { run: deleteQuestion, loading: deleteLoading } = useRequest(
    async () => {
      let selectIds = selectedRow.map((item: any) => item._id)
      return await deleteQuestionService(selectIds)
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('删除成功')
        refresh() //手动刷新列表
      },
    },
  )
  const del = () => {
    confirm({
      title: '您确定要彻底删除该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复，请谨慎操作',
      okText: '确认',
      cancelText: '取消',
      onOk: deleteQuestion,
    })
  }
  // 恢复api请求
  const { run: recover, loading: recoverLoading } = useRequest(
    async () => {
      selectedRow.forEach(async (item: any) => {
        const id = item._id || ''
        id && (await updateQuestionService(id, { isDeleted: false }))
      })
    },
    {
      manual: true,
      debounceWait: 500, // 防抖
      onSuccess() {
        message.success('恢复成功')
        refresh() //手动刷新列表
      },
    },
  )

  const handleRecover = () => {
    confirm({
      title: '您确定要恢复该问卷吗？',
      icon: <ExclamationCircleOutlined />,
      content: '恢复后将在回收站中消失',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        recover()
      },
    })
  }
  // 可以把JSX代码变成一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button
            type="primary"
            disabled={selectedRow.length === 0 ? true : false && recoverLoading}
            onClick={handleRecover}
          >
            恢复
          </Button>
          <Button danger disabled={selectedRow.length === 0 ? true : false} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        columns={columnQuestionList}
        dataSource={list}
        pagination={false}
        rowKey={(q: any) => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: any, selectedRows: any) => {
            console.log(selectedRows, 'selectedRows')
            setSelectdRowKey(selectedRows)
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {/* 问卷列表 */}
        {list.length === 0 ? <Empty description="暂无数据" /> : TableElem}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </>
  )
}

export default Trash
