import { Form, Input } from 'antd'
import { FC, useEffect } from 'react'
import { QuestionInfoPropsType } from './interface'

const { TextArea } = Input
const PropComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, desc })
  }, [title, desc])

  const handleValueChange = () => {
    if (onChange) {
      // 传递到父组件rightPanel\componentProp.tsx中
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, desc }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValueChange}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="描述内容"
        name="desc"
        rules={[{ required: true, message: '请输入描述内容' }]}
      >
        <TextArea />
      </Form.Item>
    </Form>
  )
}
export default PropComponent
