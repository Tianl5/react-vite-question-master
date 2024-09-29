import { FC, useState, ChangeEvent } from 'react'
import { message, Input, Button, Space } from 'antd'
import { useDispatch } from 'react-redux'
import styles from './Layers.module.scss'
import {
  changeSelectedId,
  changeComponentTitle,
  toggleComponentLocked,
  changeComponentHidden,
  moveComponent,
} from '@/store/componentsReducer'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { LockOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'
const Layers: FC = () => {
  const dispatch = useDispatch()

  //记录当前正在修改的组件id
  const [changingTitleId, setChangingTitleId] = useState<string>('')
  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find((c) => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件 ')
      return
    }
    if (fe_id !== selectedId) {
      // 执行选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
      return
    }

    // 点击修改标题
    setChangingTitleId(fe_id)
  }

  // 修改标题
  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value.trim()
    // 无标题
    if (!newTitle) return
    // 无选中
    if (!selectedId) return

    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
    // setChangingTitleId('')
  }

  // 切换组件隐藏 / 显示
  const handleHidden = (fe_id: string, isHidden: boolean) => {
    // 无选中
    if (!selectedId) return

    dispatch(changeComponentHidden({ fe_id, isHidden }))

    // 隐藏Input
    if (fe_id === changingTitleId) {
      setChangingTitleId('')
    }
  }
  // 切换组件 锁定 / 解锁
  const handleLock = (fe_id: string) => {
    // 无选中
    if (!selectedId) return
    dispatch(
      toggleComponentLocked({
        fe_id: fe_id,
      }),
    )
  }
  // 获取组件列表以及当前选中组件id
  const { componentList, selectedId } = useGetComponentInfo()

  // SortableContainer 组件的 items 属性，需要每个item都有 fe_id
  const componentListWithId = componentList.map((c) => ({ ...c, id: c.fe_id }))

  const hendleDragEnd = (oldIndex: number, newIndex: number) => {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={hendleDragEnd}>
      {componentList.map((c) => {
        const { fe_id, isLocked, isHidden, title } = c

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div
                className={fe_id === selectedId ? styles.selected : styles.title}
                onClick={() => handleTitleClick(fe_id)}
              >
                {fe_id === changingTitleId ? (
                  <Input
                    value={title}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                    onChange={changeTitle}
                  />
                ) : (
                  <span>{title}</span>
                )}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => handleHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => handleLock(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
