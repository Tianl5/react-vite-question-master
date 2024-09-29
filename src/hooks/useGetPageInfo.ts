/**
 * /store/pageInfoReducer
 * @description 获取编辑问卷页面信息数据
 * @author 夜云
 */
import { useSelector } from 'react-redux'
import { StateType } from '@/store/index'
import { PageInfoType } from '@/store/pageInfoReducer'
const useGetPageInfo = () => {
  const pageInfo = useSelector<StateType>((state) => state.pageInfo) as PageInfoType

  return pageInfo
}

export default useGetPageInfo
