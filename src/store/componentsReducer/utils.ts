import { ComponentInfoType, ComponentsStateType } from './index'
export const getNextSelectedId = (fe_id: string, componentList: Array<ComponentInfoType>) => {
  const visibleComponentList = componentList.filter((item) => !item.isHidden)
  const index = visibleComponentList.findIndex((item) => item.fe_id === fe_id)

  if (index === -1) return ''

  // 重新计算selectedId
  let newSelectedId = ''

  const length = visibleComponentList.length

  if (length === 1) {
    // 组件长度为1
    newSelectedId = ''
  } else {
    // 长度不为1
    if (index + 1 === length) {
      // 删除的是最后一个组件
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 删除的不是最后一个组件
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}
/**
 * 插入新组件
 * @param state
 * @param newComponent //新组建
 */
export const insertNewComponent = (state: ComponentsStateType, newComponent: ComponentInfoType) => {
  const { selectedId, componentList } = state

  const index = componentList.findIndex((item) => item.fe_id === selectedId)

  // 未选中任何组件
  if (index === -1) {
    state.componentList.push(newComponent)
  } else {
    // 选中了组件，插入到index后面
    state.componentList.splice(index + 1, 0, newComponent)
  }

  // 选中新添加组件
  state.selectedId = newComponent.fe_id
}
