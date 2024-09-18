// useLoadQuestionData
import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/axios/question'
import { useRequest } from 'ahooks'
const useLoadQuestionData = () => {
  const { id } = useParams()
  const getQuestion = async () => {
    const res = await getQuestionService(id)
    return res
  }
  const { loading, data, error } = useRequest(getQuestion)
  return { loading, data, error }
}

export default useLoadQuestionData
