import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import ManageLayout from '@/layouts/ManageLayout'
import QuestionLayout from '@/layouts/QuestionLayout'

import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'
import Register from '@/pages/Register/Register'
import NotFound from '@/pages/NotFound/NotFound'
import List from '@/pages/manage/List/List'
import Star from '@/pages/manage/Star/Star'
import Trash from '@/pages/manage/Trash/Trash'
import Edit from '@/pages/question/Edit/index'
import Stat from '@/pages/question/Stat/index'
import MobxDemo from '@/pages/MobxDemo/MobxDemo'
import TodoList from '@/pages/MobxDemo/todoList'
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'mobx',
        element: <MobxDemo />,
      },
      {
        path: 'mobx-todoList',
        element: <TodoList />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*', // 404 路由配置
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id',
        element: <Stat />,
      },
    ],
  },
])

export default router
// 常用的路由，常量
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'
export const QUESTION_EDIT_PATHNAME = '/question/edit'
export const QUESTION_STAT_PATHNAME = '/question/stat'
// 判断当前路由是否是登录页或者注册页
export const isLoginOrRegister = (pathname: string) => {
  return [LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}

// 不需要用户信息的页面(首页，登录页，注册页)
export const isNoNeedUserInfo = (pathname: string) => {
  return [HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)
}
