import * as React from 'react'
import { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'

const Edit: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <p>Edit Pages</p>
      {loading ? <div>loading...</div> : <div>{JSON.stringify(data)}</div>}
    </div>
  )
}

export default Edit
