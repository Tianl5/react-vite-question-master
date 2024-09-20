import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput/index'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle/index'
import type { FC } from 'react'
// 各个组件的propsType
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 组件的配置
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置的列表

const componentConfList: Array<ComponentConfType> = [QuestionInputConf, QuestionTitleConf]

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
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
]

// 根据type获取组件的配置
export const getComponentConfByType = (type: string) => {
  return componentConfList.find((item) => item.type === type)
}
