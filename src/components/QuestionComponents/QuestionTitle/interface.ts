export type QuestionTitlePropsType = {
  text?: string // 文本内容
  level?: 1 | 2 | 3 | 4 | 5 // 层级
  isCenter?: boolean // 是否居中
  disabled?: boolean
  onChange?: (newProps: QuestionTitlePropsType) => void // 组件props改变的回调
}

// 默认属性
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}

// 层级默认属性：1-5级
export const SelectOption = [
  { text: 1, value: 1 },
  { text: 2, value: 2 },
  { text: 3, value: 3 },
  // { text: 4, value: 4 },
  // { text: export5, value: 5 },
]
