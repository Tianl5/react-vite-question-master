import { useSelector } from 'react-redux'
import { StateType } from '@/store/index'
import { ComponentsStateType } from '@/store/componentsReducer'
const useGetComponentInfo = () => {
  const components = useSelector<StateType>((state) => {
    // 修复初始化时，past数组存在默认值，按撤销把画布组件删除
    if (state.components.past.length === 1 && state.components.past[0].componentList.length === 0) {
      state.components.past[0] = state.components.present
    }
    return state.components.present
  }) as ComponentsStateType

  const { componentList = [], selectedId, copiedComponent } = components

  // 找到选中的组件
  const selectedComponent = componentList.find((c) => c.fe_id === selectedId)
  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  }
}

export default useGetComponentInfo
