import * as React from 'react'
import { FC } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Home: FC = () => {
  const navigate = useNavigate()
  function gotoLogin() {
    console.log('gotoLogin')
    navigate({
      pathname: '/login',
      search: 'a=1&b=2',
    })
  }
  return (
    <div>
      <h1>Home</h1>
      <button onClick={gotoLogin}>登录</button>
      <Link to="/register">注册</Link>
    </div>
  )
}

export default Home
