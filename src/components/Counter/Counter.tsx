import * as React from 'react'
import { FC, useState, useEffect } from 'react'
import styles from './Counter.module.scss'
type PropsType = {
  count: number
}
const Counter: FC<PropsType> = (props: PropsType) => {
  const [countState, setCountState] = useState<number>(props.count || 0)
  useEffect(() => {
    let timer = setInterval(() => {
      setCountState((num) => num + 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  // 增
  const handleAdd = () => {
    setCountState(countState + 1)
  }
  // 减
  const handleSubtract = () => {
    if (countState === 0) return
    setCountState(countState - 1)
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles['counter-box']}>
          <div className={styles.add} onClick={handleAdd}>
            +
          </div>
          <div className={styles.count}>{countState}</div>
          <div className={styles.subtract} onClick={handleSubtract}>
            -
          </div>
        </div>
      </div>
    </>
  )
}

export default Counter
