/**
 * @description 问卷 radio组件
 * @author 夜云
 */

import { QuestionRadioDefaultProps } from './interface'

import QuestionRadio from './QuestionRadio'
// 右侧属性组件
import PropComponent from './PropComponent'
export * from './interface'

// Textarea组件配置
export default {
  title: '单选组件',
  type: 'questionRadio', // 要和后端统一好
  Component: QuestionRadio,
  PropComponent, // 属性配置组件
  defaultProps: QuestionRadioDefaultProps,
}
