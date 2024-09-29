import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import { FC } from 'react'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent, componentList } = useGetComponentInfo()

  // 判断组件是否为第一个和最后一个
  const componentListLength = componentList.length
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId)

  const isFirstComputed = () => {
    if (!selectedId) return true
    return selectedIndex === 0
  }
  const isLastComputed = () => {
    if (!selectedId) return true
    return selectedIndex === componentListLength - 1
  }
  const isFirst = isFirstComputed()
  const isLast = isLastComputed()
  // 获取选中组件的属性
  const { isLocked } = selectedComponent || {}
  const dispatch = useDispatch()
  // 删除选中的组件
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }
  // 隐藏选中的组件
  const handleHidden = () => {
    dispatch(
      changeComponentHidden({
        fe_id: selectedId,
        isHidden: true,
      }),
    )
  }

  // 锁定选中的组件
  const handleLock = () => {
    dispatch(toggleComponentLocked({ fe_id: selectedId }))
  }

  // 复制选中的组件
  const handleCopy = () => {
    dispatch(copySelectedComponent())
  }

  // 粘贴选中的组件
  const handlePaste = () => {
    dispatch(pasteCopiedComponent())
  }
  // 选中上一个组件
  const handleSelectPrev = () => {
    dispatch(selectPrevComponent())
  }

  // 选中下一个组件
  const handleSelectNext = () => {
    dispatch(selectNextComponent())
  }

  // 撤销
  const handleUndo = () => {
    dispatch(UndoActionCreators.undo())
  }
  // 重做
  const handleRedo = () => {
    dispatch(UndoActionCreators.redo())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          disabled={!selectedId}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          disabled={!selectedId}
          onClick={handleHidden}
        />
      </Tooltip>
      <Tooltip title={isLocked ? '解锁' : '锁定'}>
        <Button
          type={isLocked ? 'primary' : 'default'}
          shape="circle"
          icon={<LockOutlined />}
          disabled={!selectedId}
          onClick={handleLock}
        />
      </Tooltip>
      <Tooltip title="复制">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          disabled={!selectedId}
          onClick={handleCopy}
        />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          disabled={!copiedComponent}
          onClick={handlePaste}
        />
      </Tooltip>
      <Tooltip title="选中上一个组件">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          disabled={isFirst}
          onClick={handleSelectPrev}
        />
      </Tooltip>
      <Tooltip title="选中下一个组件">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          disabled={isLast}
          onClick={handleSelectNext}
        />
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo} />
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo} />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
