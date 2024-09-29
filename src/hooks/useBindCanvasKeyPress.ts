import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '@/store/componentsReducer'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
// 判断光标是否在画布中
const isActiveElementValid = () => {
  const activeElem = document.activeElement

  //  没有增加dnd-kit 之前
  // if (activeElem === document.body) return true

  // 增加 dnd-kit 以后
  if (activeElem === document.body) return true
  if (activeElem?.matches('div[role="button"')) return true
  return false
}
/**
 * 绑定画布的快捷键
 * @returns
 */
const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()
  // 删除选中的组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })
  // 复制当前组件信息
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })
  // 粘贴组件信息
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })
  // 选中上一个组件
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })
  // 选中下一个组件
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, // 严格匹配
    },
  )
  // 重做
  useKeyPress(
    ['ctrl.y', 'meta.y'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.redo())
    },
    {
      exactMatch: true, // 严格匹配
    },
  )
}

export default useBindCanvasKeyPress
