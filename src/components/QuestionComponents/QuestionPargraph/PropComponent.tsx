import { Form, Input, Checkbox } from 'antd'
import { FC, useEffect } from 'react'
import { QuestionParagraphPropsType } from './interface'

const { TextArea } = Input
const PropComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, disabled, onChange } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ text, isCenter })
  }, [text, isCenter])
  const handleValueChange = () => {
    if (onChange) {
      // 传递到父组件rightPanel\componentProp.tsx中
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ text, isCenter }}
      onValuesChange={handleValueChange}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
