import { FC } from 'react'
import { componentConfGroup, ComponentConfType } from '@/components/QuestionComponents'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '@/store/componentsReducer'
import { nanoid } from 'nanoid'
const { Title } = Typography

const genComponent = (componentInfo: ComponentConfType) => {
  const { title, type, Component, defaultProps } = componentInfo
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(), // 前端生成的id，服务端Mongodb不认这种格式
        title,
        type,
        props: defaultProps,
      }),
    )
  }
  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}
const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, i) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: i > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>
              {components.map((item, j) => {
                return <div key={j}>{genComponent(item)}</div>
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
