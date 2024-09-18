import { FC, useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_PARAM_KEY } from '@/constant/index'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
type PropsType = {
  total: number
}
const ListPagination: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(LIST_PAGE_SIZE)
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const { pathname } = useLocation()
  // 分页改变页面参数
  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    navigate({
      pathname: pathname,
      search: searchParams.toString(),
    })
  }
  // 从url参数中找到page pagesize 同步到分页组件中
  useEffect(() => {
    const page = searchParams.get(LIST_PAGE_PARAM_KEY)
    const pageSize = searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)

    if (page) {
      setCurrent(parseInt(page))
    }
    if (pageSize) {
      setPageSize(parseInt(pageSize))
    }
  }, [searchParams])
  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={handlePageChange}
      showTotal={(total) => `共 ${total} 条`}
    />
  )
}

export default ListPagination
