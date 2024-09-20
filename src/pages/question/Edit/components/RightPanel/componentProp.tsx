import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { FC } from 'react'
import { ComponentPropsType, getComponentConfByType } from '@/components/QuestionComponents'
import { changeComponentProps } from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'
const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}
const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  // 找到当前选中的组件信息
  const { selectedComponent } = useGetComponentInfo()

  // 找不到显示提示组件
  if (selectedComponent == null) return <NoProp />
  const { type, props } = selectedComponent
  // 通过type找到当前组件的配置
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />

  const { PropComponent } = componentConf

  // 统一修改当前选中组件的props，并存到redux中
  const changeProps = (newProps: ComponentPropsType) => {
    // 没有选中组件
    if (selectedComponent == null) return
    const { fe_id } = selectedComponent

    // 修改props，存储到redux中
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  return <PropComponent {...props} onChange={changeProps} />
}

export default ComponentProp
