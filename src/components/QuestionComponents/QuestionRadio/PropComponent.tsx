import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { nanoid } from 'nanoid'
import { FC, useEffect } from 'react'
import { QuestionRadioPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options, onChange, disabled } = props

  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])

  const handleValueChange = () => {
    if (onChange) {
      // 传递到父组件rightPanel\componentProp.tsx中
      const newValues = form.getFieldsValue() as QuestionRadioPropsType
      const { options = [] } = newValues

      if (options) {
        newValues.options = options.filter((opt) => !(opt.text == null))
      }
      options.forEach((opt) => {
        if (opt.value) return
        opt.value = nanoid(5) // 补齐opt value
      })
      console.log('newValues', newValues)
      onChange(newValues)
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValueChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {/* 遍历所有的选项（可删除） */}
              {fields.map(({ key, name }, i) => {
                return (
                  <Space key={key} align="baseline">
                    {/* 当前选项 输入框 */}
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        {
                          required: true,
                          message: '请输入选项文字',
                        },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((opt: OptionType) => {
                              if (opt.text === text) num++ // 记录 text 相同的个数，预期只有 1 个（自己）
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('和其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字" />
                    </Form.Item>
                    {/*  当前选项 删除按钮 */}
                    {i > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              {/* 添加选项 */}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  block
                  onClick={() => add({ text: '', value: '' })}
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          allowClear
          options={options.map(({ text, value }) => ({ value, label: text || '' }))}
        />
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}
export default PropComponent
