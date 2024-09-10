import * as React from 'react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
const Login: FC = () => {
  const navigate = useNavigate()
  const back = () => {
    navigate(-1)
  }
  return (
    <div>
      <h1>Login</h1>
      <button onClick={back}>返回</button>
    </div>
  )
}

export default Login
