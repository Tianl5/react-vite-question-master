// useLoadQuestionData
import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/axios/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '@/store/componentsReducer'

const useLoadQuestionData = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷ID')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    },
  )

  // 根据获取的data 设置redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data

    // 获取默认的selectedId
    let selectedId = ''
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }
    // 把 componentList 存储到 redux store中
    dispatch(resetComponents({ componentList, selectedId: selectedId || '' }))
  }, [data])

  // 根据id变化，执行ajax加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])
  return { loading, error }
}

export default useLoadQuestionData
