import * as React from 'react'
import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.scss'
import { Typography, Space, Form, Input, Button, Checkbox } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { REGISTER_PATHNAME } from '@/router'
import { USERNAME_RULES, PASSWORD_RULES } from '@/constant/formRules'
const { Title } = Typography
const FormItem = Form.Item

// 本地存储账号密码
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

const rememberUser = (username: string, password: string) => {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

const deleteUserFromStorage = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

const getUserInfoFromStorage = () => {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}
const Login: FC = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm() // 第三方hook
  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({
      username,
      password,
    })
  }, [])
  const onSubmit = (values: any) => {
    console.log('submit', values)
    if (values.remember) {
      // console.log('记住')
      rememberUser(values.username, values.password)
    } else {
      // console.log('忘记')
      deleteUserFromStorage()
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onSubmit}
          // 配置默认值
          initialValues={{
            remember: false,
          }}
        >
          <FormItem label="用户名" name="username" rules={USERNAME_RULES}>
            <Input />
          </FormItem>
          <FormItem label="密码" name="password" rules={PASSWORD_RULES}>
            <Input.Password />
          </FormItem>
          <FormItem name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
            <Checkbox>记住我</Checkbox>
          </FormItem>
          <FormItem wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default Login
