import * as React from 'react'
import { FC, useEffect } from 'react'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
//  Modal the application store
class Timer {
  secondsPassed = 0
  constructor() {
    makeAutoObservable(this)
  }
  increase() {
    this.secondsPassed++
  }
  reset() {
    this.secondsPassed = 0
  }
}
// 实例化
const myTimer = new Timer()

type PropsType = {
  timer: Timer
}
const TimerView = observer((props: PropsType) => {
  const { timer } = props

  return <button onClick={() => timer.reset()}>Seconds passed: {timer.secondsPassed}</button>
})
const MobxDemo: FC = () => {
  useEffect(() => {
    const timer = setInterval(() => {
      myTimer.increase()
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <div>
      <p>Mobx Demo</p>
      return <TimerView timer={myTimer} />
    </div>
  )
}

export default MobxDemo
