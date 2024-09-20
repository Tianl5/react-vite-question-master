/**
 * @description: 问卷 标题
 * @author: 夜云
 */

// 中间画布组件
import QuestionTitle from './QuestionTitle'

import { QuestionTitleDefaultProps } from './interface'

// 右侧属性组件
import PropComponent from './PropComponent'
export * from './interface'

export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component: QuestionTitle,
  PropComponent, // 属性配置组件
  defaultProps: QuestionTitleDefaultProps,
}
