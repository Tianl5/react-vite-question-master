/**
 * @description: 问卷 多行输入框
 * @author: 夜云
 */
// 中间画布组件
import QuestionTextarea from './QuestionTextarea'

import { QuestionTextareaDefaultProps } from './interface'

// 右侧属性组件
import PropComponent from './PropComponent'
export * from './interface'

// Textarea组件配置
export default {
  title: '多行输入框',
  type: 'questionTextarea', // 要和后端统一好
  Component: QuestionTextarea,
  PropComponent, // 属性配置组件
  defaultProps: QuestionTextareaDefaultProps,
}
