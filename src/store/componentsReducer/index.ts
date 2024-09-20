import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '@/components/QuestionComponents/index'
export type ComponentInfoType = {
  fe_id: string // TODO 后面解释
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
  // 当前选中的组件id
  selectedId: string
}
// 初始化
const INIT_STATE: ComponentsStateType = {
  componentList: [],
  selectedId: '',
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
      // state.componentList.push(action.payload)
      const newComponent = action.payload

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
  },
})

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps } =
  componentsSlice.actions

export default componentsSlice.reducer
