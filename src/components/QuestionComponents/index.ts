import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput/index'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle/index'
import QuestionPargraphConf, { QuestionParagraphPropsType } from './QuestionPargraph/index'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo/index'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea/index'
import QuestionRadioConf, { QuestionRadioPropsType } from './QuestionRadio/index'
import QuestionCheckboxConf, { QuestionCheckboxPropsType } from './QuestionCheckbox/index'
import type { FC } from 'react'
// 各个组件的propsType
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType &
  QuestionParagraphPropsType &
  QuestionInfoPropsType &
  QuestionTextareaPropsType &
  QuestionRadioPropsType &
  QuestionCheckboxPropsType

// 组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置的列表

const componentConfList: Array<ComponentConfType> = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionPargraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]

// 组件分组类型
type ComponentGroupType = {
  groupId: string
  groupName: string
  components: Array<ComponentConfType>
}
// 组件分组
export const componentConfGroup: Array<ComponentGroupType> = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionInfoConf, QuestionTitleConf, QuestionPargraphConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf, QuestionTextareaConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]

// 根据type获取组件的配置
export const getComponentConfByType = (type: string) => {
  return componentConfList.find((item) => item.type === type)
}
