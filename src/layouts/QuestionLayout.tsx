import * as React from 'react'
import { FC } from 'react'
import { Outlet } from 'react-router-dom'
const QuestionLayout: FC = () => {
  return (
    <>
      <div>QuestionLayout layout</div>
      <div>
        <Outlet />
      </div>
      <div>QuestionLayout footer</div>
    </>
  )
}

export default QuestionLayout
