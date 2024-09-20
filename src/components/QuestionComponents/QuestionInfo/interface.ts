export type QuestionInfoPropsType = {
  title?: string // 标题
  desc?: string // 描述
  disabled?: boolean
  onChange?: (newProps: QuestionInfoPropsType) => void // 组件props改变的回调
}

// 默认属性
export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: '问卷标题',
  desc: '问卷描述',
}
