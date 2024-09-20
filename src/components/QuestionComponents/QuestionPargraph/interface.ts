export type QuestionParagraphPropsType = {
  text?: string
  isCenter?: boolean
  disabled?: boolean
  onChange?: (newProps: QuestionParagraphPropsType) => void // 组件props改变的回调
}

// 默认属性
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一行段落',
  isCenter: false,
}
