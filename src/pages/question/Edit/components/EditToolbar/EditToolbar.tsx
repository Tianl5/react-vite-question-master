import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
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
const EditToolbar: FC = () => {
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()

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
          disabled={!selectedId}
          onClick={handleSelectPrev}
        />
      </Tooltip>
      <Tooltip title="选中下一个组件">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          disabled={!selectedId}
          onClick={handleSelectNext}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
