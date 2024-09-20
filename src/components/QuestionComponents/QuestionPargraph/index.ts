/**
 * @description: 问卷 - 段落
 * @author: 夜云
 */

import QuestionPargraph from './QuestionPargraph'

import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'
export * from './interface'

// Paragraph 组件配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component: QuestionPargraph,
  PropComponent, // 属性配置组件
  defaultProps: QuestionParagraphDefaultProps,
}
