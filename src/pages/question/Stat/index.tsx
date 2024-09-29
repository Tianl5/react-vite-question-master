import * as React from 'react'
import { FC, useState } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import { Spin, Result, Button } from 'antd'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import styles from './index.module.scss'
import StatHeader from './components/StatHeader/StatHeader'
import ComponentList from './components/ComponentList/ComponentList'
const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { isPublished, title } = useGetPageInfo()
  const navigate = useNavigate()

  // 状态提升 selectedId type
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')
  // 修改标题
  useTitle(`问卷统计 - ${title}`)
  const LoadingElem = () => (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )

  const getContentElem = () => {
    //  问卷还未发布
    if (typeof isPublished == 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status="warning"
            title="该页面尚未发布"
            extra={
              <Button type="primary" onClick={() => navigate(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      )
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>main</div>
        <div className={styles.right}>right</div>
      </>
    )
  }
  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading && <LoadingElem />}
        {!loading && <div className={styles.content}>{getContentElem()}</div>}
      </div>
    </div>
  )
}

export default Stat
