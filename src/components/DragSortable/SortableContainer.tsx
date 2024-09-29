import { FC } from 'react'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
} from '@dnd-kit/core'
import {
  // arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

type PropsType = {
  children: JSX.Element | JSX.Element[] // 相当于 vue slot
  items: Array<{ id: string; [key: string]: any }>
  onDragEnd: (oldIndex: number, newIndex: number) => void
}
const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props

  const sensor = useSensors(
    useSensor(MouseSensor, {
      // 鼠标移动超过八个像素，才判定为拖动
      activationConstraint: {
        distance: 8,
      },
    }),
  )
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over == null) return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      onDragEnd(oldIndex, newIndex)
    }
  }
  return (
    <DndContext sensors={sensor} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

export default SortableContainer
