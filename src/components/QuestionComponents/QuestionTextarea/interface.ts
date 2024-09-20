export type QuestionTextareaPropsType = {
  title?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (newProps: QuestionTextareaPropsType) => void // 组件props改变的回调
}

export const QuestionTextareaDefaultProps: QuestionTextareaPropsType = {
  title: '多行输入框标题',
  placeholder: '请输入...',
}
