import api, { ResDataType, baseUrl } from './index'

type searchParams = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number
  pageSize: number
}

// 获取单个问卷信息
export const getQuestionService = async (id: string): Promise<ResDataType> => {
  return await api.get(`${baseUrl}/api/question/${id}`)
}
// 新增问卷
export const createQuestionService = async (): Promise<ResDataType> => {
  return await api.post(`${baseUrl}/api/question`)
}

// 获取问卷列表

export const getQuestionList = async (query: Partial<searchParams> = {}): Promise<ResDataType> => {
  return await api.get(`${baseUrl}/api/question`, {
    params: query,
  })
}

// 更新单个问卷
export const updateQuestionService = async (
  id: string,
  data: { [key: string]: any },
): Promise<ResDataType> => {
  return await api.patch(`${baseUrl}/api/question/${id}`, data)
}

// 复制单个问卷
export const duplicateQuestionService = async (id: string): Promise<ResDataType> => {
  return await api.post(`${baseUrl}/api/question/duplicate/${id}`)
}

// 批量删除问卷
export const deleteQuestionService = async (ids: string[]): Promise<ResDataType> => {
  return await api.delete(`${baseUrl}/api/question`, {
    data: {
      ids,
    },
  })
}
