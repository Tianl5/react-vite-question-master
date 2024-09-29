import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import { FC, useEffect, useState } from 'react'
import ComponentProp from './componentProp'
import PageSetting from './PageSetting'

// TS 语法枚举
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState<string>(TAB_KEYS.PROP_KEY)

  // 当前选中的selectedId
  const { selectedId } = useGetComponentInfo()

  // 监听selectedId变化，动态展示右侧tab选项
  useEffect(() => {
    selectedId ? setActiveKey(TAB_KEYS.PROP_KEY) : setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])
  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          <span>属性</span>
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          <span>页面设置</span>
        </span>
      ),
      children: <PageSetting />,
    },
  ]

  return <Tabs activeKey={activeKey} items={tabsItems} />
}

export default RightPanel
