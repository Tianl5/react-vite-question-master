import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '@/components/QuestionComponents/index'
import { getNextSelectedId, insertNewComponent } from './utils'
import { deepClone } from '@/utils'
import { nanoid } from 'nanoid'
import { message } from 'antd'
import { arrayMove } from '@dnd-kit/sortable'
export type ComponentInfoType = {
  fe_id: string // TODO 后面解释
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type ComponentsStateType = {
  // 组件列表
  componentList: Array<ComponentInfoType>
  // 当前选中的组件id
  selectedId: string
  // 复制当前组件的信息
  copiedComponent: ComponentInfoType | null
}
// 初始化
export const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
  copiedComponent: null,
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改selectedId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    // 添加新组件
    addComponent: (state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload

      // 插入组件
      insertNewComponent(state, newComponent)
    },
    // 修改组件属性
    changeComponentProps: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
    ) => {
      const { fe_id, newProps } = action.payload

      // 找到当前要更改的组件
      const curComp = state.componentList.find((item) => item.fe_id === fe_id)
      if (curComp) {
        // 修改组件属性
        curComp.props = {
          ...curComp.props,
          ...newProps,
        }
      }
    },
    // 删除选中的组件
    removeSelectedComponent: (state: ComponentsStateType) => {
      const { selectedId: removeId, componentList = [] } = state
      const index = componentList.findIndex((item) => item.fe_id === removeId)

      state.selectedId = getNextSelectedId(removeId, componentList)
      if (index !== -1) {
        state.componentList.splice(index, 1)
      }
    },

    // 隐藏 / 显示 组件
    changeComponentHidden: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
    ) => {
      const { componentList = [] } = state
      const { fe_id, isHidden } = action.payload

      // 隐藏组件
      if (isHidden) {
        state.selectedId = getNextSelectedId(fe_id, componentList)
      } else {
        // 显示组件
        state.selectedId = fe_id
      }
      const curComp = state.componentList.find((item) => item.fe_id === fe_id)
      if (curComp) {
        curComp.isHidden = isHidden
      }
    },

    // 锁定 / 解锁组件
    toggleComponentLocked: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string }>,
    ) => {
      const { fe_id } = action.payload
      const curComp = state.componentList.find((item) => item.fe_id === fe_id)
      if (curComp) {
        curComp.isLocked = !curComp.isLocked
      }
    },

    // 复制 当前 选中的组件
    copySelectedComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList = [] } = state

      // 当前选中的组件
      const selectedComponent = componentList.find((item) => item.fe_id === selectedId)

      // 没选中组件
      if (selectedComponent == null) return

      // 选中了组件，深拷贝
      state.copiedComponent = deepClone(selectedComponent)
      message.success('复制成功')
    },

    // 粘贴 复制 的组件
    pasteCopiedComponent: (state: ComponentsStateType) => {
      const { copiedComponent, componentList = [] } = state

      if (copiedComponent == null) return

      // 要把fe_id 修改了，id重复会出现很多问题
      copiedComponent.fe_id = nanoid()

      // 插入组件
      insertNewComponent(state, copiedComponent)
      message.success('粘贴成功')
    },

    // 选中上一个组件
    selectPrevComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state

      // 找到当前选中组件的index
      const selectedIndex = componentList.findIndex((item) => item.fe_id === selectedId)

      // 未选中任何组件
      if (selectedIndex === -1) return

      // 已经选中第一个，无法在向上选中
      if (selectedIndex === 0) return

      state.selectedId = componentList[selectedIndex - 1].fe_id
    },
    selectNextComponent: (state: ComponentsStateType) => {
      const { selectedId, componentList } = state

      // 找到当前选中组件的index
      const selectedIndex = componentList.findIndex((item) => item.fe_id === selectedId)

      // 未选中任何组件
      if (selectedIndex === -1) return

      // 已经选中最后一个，无法在向下选中
      if (selectedIndex === componentList.length - 1) return

      state.selectedId = componentList[selectedIndex + 1].fe_id
    },

    // 修改组件标题
    changeComponentTitle: (
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; title: string }>,
    ) => {
      const { fe_id, title } = action.payload
      const curComp = state.componentList.find((item) => item.fe_id === fe_id)
      if (curComp) {
        curComp.title = title
      }
    },
    // 移动拖拽组件位置
    moveComponent: (
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>,
    ) => {
      const { oldIndex, newIndex } = action.payload
      const { componentList: curComponentList } = state

      state.componentList = arrayMove(curComponentList, oldIndex, newIndex)
    },
  },
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
