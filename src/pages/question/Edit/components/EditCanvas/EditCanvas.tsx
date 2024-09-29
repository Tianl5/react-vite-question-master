import * as React from 'react'
import { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponentConfByType } from '@/components/QuestionComponents'
import { ComponentInfoType, changeSelectedId, moveComponent } from '@/store/componentsReducer/index'
import { useDispatch } from 'react-redux'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'
type PropsType = {
  loading: boolean
}

// 获取组件实例
const genComponent = (componentInfo: ComponentInfoType) => {
  const { type, props } = componentInfo // 每个组件的信息都是从redex store中获取的
  const ComponentConf = getComponentConfByType(type)
  if (ComponentConf == null) return null
  const { Component } = ComponentConf

  return <Component {...props} />
}
const EditCanvas: FC<PropsType> = (props: PropsType) => {
  const { loading } = props
  // 获取组件列表信息
  const { componentList, selectedId } = useGetComponentInfo()

  const dispatch = useDispatch()

  // 点击组件时，把id存入redux中
  const handleClick = (event: MouseEvent, id: string) => {
    event.stopPropagation() // 阻止冒泡
    dispatch(changeSelectedId(id))
  }

  // 绑定快捷键
  useBindCanvasKeyPress()
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  // SortableContainer 组件的 items 属性，需要每个item都有 fe_id
  const componentListWithId = componentList.map((c) => ({ ...c, id: c.fe_id }))

  const hendleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={hendleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter((item) => !item.isHidden)
          .map((item) => {
            const { fe_id, isLocked } = item
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  key={fe_id}
                  className={[
                    selectedId === fe_id
                      ? styles['component-wrapper-selected']
                      : styles['component-wrapper'],
                    isLocked ? styles['locked'] : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={(e) => handleClick(e, fe_id)}
                >
                  <div className={styles['component']}>{genComponent(item)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
