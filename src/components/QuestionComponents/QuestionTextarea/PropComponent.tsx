import { Form, Input } from 'antd'
import { FC, useEffect } from 'react'
import { QuestionTextareaPropsType } from './interface'

const { TextArea } = Input
const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, placeholder })
  }, [title, placeholder])

  const handleValueChange = () => {
    if (onChange) {
      // 传递到父组件rightPanel\componentProp.tsx中
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValueChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="占位提示" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}
export default PropComponent
