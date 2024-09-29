import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  components: StateWithHistory<ComponentsStateType> // 增加了redux-undo
  pageInfo: PageInfoType
}
export default configureStore({
  // 分模块拓展
  reducer: {
    // 用户西悉尼
    user: userReducer,
    // 组件列表数据 问卷信息
    // components: componentsReducer,
    components: undoable(componentsReducer, {
      limit: 20, // 限制记录20次撤销
      filter: excludeAction([
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]), // 不希望这些action存到历史记录里
    }),
    // 页面信息
    pageInfo: pageInfoReducer,
  },
})
