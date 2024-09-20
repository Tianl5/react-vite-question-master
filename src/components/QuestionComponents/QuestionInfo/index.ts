/**
 * @description: 问卷 - 问卷标题
 * @author: 夜云
 */

import QuestionInfo from './QuestionInfo'

import { QuestionInfoDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

// Paragraph 组件配置
export default {
  title: '问卷标题',
  type: 'questionInfo', // 要和后端统一好
  Component: QuestionInfo,
  PropComponent, // 属性配置组件
  defaultProps: QuestionInfoDefaultProps,
}
