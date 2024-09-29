/**
 * @description 问卷 checkbox组件
 * @author 夜云
 */

import { QuestionCheckboxDefaultProps } from './interface'

import QuestionCheckbox from './QuestionCheckbox'
// 右侧属性组件
import PropComponent from './PropComponent'
export * from './interface'

// Textarea组件配置
export default {
  title: '多选组件',
  type: 'questionCheckbox', // 要和后端统一好
  Component: QuestionCheckbox,
  PropComponent, // 属性配置组件
  defaultProps: QuestionCheckboxDefaultProps,
}
