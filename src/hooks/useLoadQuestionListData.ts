// 用户问卷列表查询 分页的hook
import { getQuestionList } from '@/axios/question'
import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '@/constant'
type OptionType = {
  isStar: boolean
  isDeleted: boolean
}
const useLoadQuestionListData = (opt: Partial<OptionType>) => {
  const { isStar = false, isDeleted = false } = opt
  const [searchParams] = useSearchParams()
  // 获取列表
  const getQuestionListApi = async () => {
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY)
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    const res = await getQuestionList({
      keyword,
      isStar,
      isDeleted,
      page,
      pageSize,
    })
    return res
  }

  const { data, loading, error, refresh } = useRequest(getQuestionListApi, {
    refreshDeps: [searchParams], // 刷新的依赖项
  })

  return { data, loading, error, refresh }
}

export default useLoadQuestionListData
