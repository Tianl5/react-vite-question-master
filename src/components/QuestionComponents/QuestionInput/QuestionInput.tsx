import { Typography, Input } from 'antd'
import * as React from 'react'
import { FC } from 'react'
import { QuestionInputDefaultProps, QuestionInputPropsType } from './interface'
const { Paragraph } = Typography

const QuestionInput: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
  const { title, placeholder } = { ...QuestionInputDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
