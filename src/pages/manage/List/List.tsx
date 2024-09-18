import QuestionCard from '@/components/QuestionCard/QuestionCard'
import ListSearch from '@/components/ListSearch/ListSearch'
import * as React from 'react'
import { FC } from 'react'
import styles from '../scss/common.module.scss'
import { useTitle } from 'ahooks'
import { Typography, Spin } from 'antd'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListPagination from '@/components/ListPagination/ListPagination'
const { Title } = Typography
const List: FC = () => {
  // 自定义浏览器标题
  useTitle('智能问卷 - 我的问卷')

  // 获取列表
  const { data = {}, loading, error } = useLoadQuestionListData({})
  const { list = [], total = 0 } = data
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          {/* <h3>我的问卷</h3> */}
          <Title level={3}>我的问卷</Title>
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
        {!loading &&
          list.length > 0 &&
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

export default List
