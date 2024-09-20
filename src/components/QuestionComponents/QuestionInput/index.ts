/**
 * @description: 问卷 输入框
 * @author: 夜云
 */
// 中间画布组件
import QuestionInput from './QuestionInput'

import { QuestionInputDefaultProps } from './interface'

// 右侧属性组件
import PropComponent from './PropComponent'
export * from './interface'

// input 组件配置
export default {
  title: '输入框',
  type: 'questionInput', // 要和后端统一好
  Component: QuestionInput,
  PropComponent, // 属性配置组件
  defaultProps: QuestionInputDefaultProps,
}
