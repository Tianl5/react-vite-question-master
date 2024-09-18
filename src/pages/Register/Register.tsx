import * as React from 'react'
import { FC } from 'react'
import styles from './Register.module.scss'
import { Typography, Space, Form, Input, Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router'
import { USERNAME_RULES, PASSWORD_RULES, CONFIRM_RULES } from '@/constant/formRules'
const { Title } = Typography
const FormItem = Form.Item
const Register: FC = () => {
  const onSubmit = (values: any) => {
    console.log('submit', values)
  }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onSubmit}>
          <FormItem label="用户名" name="username" rules={USERNAME_RULES}>
            <Input />
          </FormItem>
          <FormItem label="密码" name="password" rules={PASSWORD_RULES}>
            <Input.Password />
          </FormItem>
          <FormItem
            label="确认密码"
            name="confirm"
            dependencies={['password']} // 依赖于password，password变化会重新触发validate
            rules={[
              ...CONFIRM_RULES,
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致'))
                },
              }),
            ]}
          >
            <Input.Password />
          </FormItem>
          <FormItem label="昵称" name="nickname">
            <Input />
          </FormItem>
          <FormItem wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>{`已有账户? >>前往登录`}</Link>
            </Space>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default Register
