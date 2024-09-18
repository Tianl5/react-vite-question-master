import * as React from 'react'
import { FC } from 'react'
import styles from '../scss/common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '@/components/QuestionCard/QuestionCard'
import ListSearch from '@/components/ListSearch/ListSearch'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListPagination from '@/components/ListPagination/ListPagination'
const { Title } = Typography

const Star: FC = () => {
  useTitle('智能问卷 - 星标问卷')
  // 获取列表
  const { data = {}, loading, error } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
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
        {!loading && list.length === 0 && <Empty description="暂无数据"></Empty>}
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <ListPagination total={total} />
      </div>
    </>
  )
}

export default Star
