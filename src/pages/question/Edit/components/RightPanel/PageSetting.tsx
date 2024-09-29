import useGetPageInfo from '@/hooks/useGetPageInfo'
import { resetPageInfo } from '@/store/pageInfoReducer'
import { Form, Input } from 'antd'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
const { TextArea } = Input
const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  // 把修改的最新数据更新到redux store中
  const handleValuesChange = () => {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  // 实时更新表单内容
  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        label="问卷标题"
        name="title"
        rules={[{ required: true, message: '请输入问卷标题' }]}
      >
        <Input placeholder="请输入问卷标题" />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="问卷描述" name="css">
        <TextArea placeholder="请输入 CSS 样式代码..." />
      </Form.Item>
      <Form.Item label="问卷描述" name="js">
        <TextArea placeholder="请输入 JS 脚本代码..." />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
