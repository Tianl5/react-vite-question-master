import { FC, useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import * as React from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '@/constant/index'
const { Search } = Input
const ListSearch: FC = () => {
  const navigate = useNavigate()
  // 获取路由地址
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useState('')
  // 获取url参数，并设置到input 的值中
  const [searchParamsValue] = useSearchParams()
  // searchParamsValue 变化了就执行这个函数
  useEffect(() => {
    const newValue = searchParamsValue.get(LIST_SEARCH_PARAM_KEY) || ''
    setSearchParams(newValue)
  }, [searchParamsValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value)
  }
  // 点击查询在URL上增加查询参数
  const handleSearch = (value: string) => {
    navigate({
      pathname: pathname,
      search: `?${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <Search
      placeholder="输入问卷名称"
      value={searchParams}
      onChange={handleChange}
      onSearch={handleSearch}
      size="large"
      style={{ width: '260px' }}
      allowClear
    />
  )
}

export default ListSearch
