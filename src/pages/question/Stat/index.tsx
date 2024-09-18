import * as React from 'react'
import { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <p>Stat Pages</p>
      {loading ? <div>loading...</div> : <div>{JSON.stringify(data)}</div>}
    </div>
  )
}

export default Stat
