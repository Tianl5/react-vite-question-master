import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import { FC } from 'react'
import ComponentProp from './componentProp'
// import ComponentLib from './ComponentLib'
const RightPanel: FC = () => {
  const tabsItems = [
    {
      key: 'prop',
      label: (
        <span>
          <FileTextOutlined />
          <span>属性</span>
        </span>
      ),
      children: <ComponentProp></ComponentProp>,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          <span>页面设置</span>
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ]

  return <Tabs defaultActiveKey="prop" items={tabsItems} />
}

export default RightPanel
