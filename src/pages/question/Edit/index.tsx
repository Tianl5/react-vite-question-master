import * as React from 'react'
import { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './components/EditCanvas/EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '@/store/componentsReducer/index'
import LeftPanel from './components/LeftPanel/LeftPanel'
import RightPanel from './components/RightPanel/RightPanel'
import EditHeader from './components/EditHeader/EditHeader'
const Edit: FC = () => {
  const { loading } = useLoadQuestionData()

  const dispatch = useDispatch()
  const clearSelectedId = () => {
    dispatch(changeSelectedId(''))
  }
  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
