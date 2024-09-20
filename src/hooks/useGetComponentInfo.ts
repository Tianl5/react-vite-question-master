import { useSelector } from 'react-redux'
import { StateType } from '@/store/index'
import { ComponentsStateType } from '@/store/componentsReducer'
const useGetComponentInfo = () => {
  const components = useSelector<StateType>((state) => state.components) as ComponentsStateType

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
