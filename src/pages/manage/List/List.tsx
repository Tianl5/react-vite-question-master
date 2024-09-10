import QuestionCard from '@/components/QuestionCard/QuestionCard'
import * as React from 'react'
import { FC, useState } from 'react'
import styles from './List.module.scss'
import { useSearchParams } from 'react-router-dom'
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '3月10日 13:05',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 2,
    createAt: '3月11日 13:05',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: false,
    isStar: false,
    answerCount: 5,
    createAt: '3月12日 13:05',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: true,
    isStar: false,
    answerCount: 4,
    createAt: '3月13日 13:05',
  },
]
const List: FC = () => {
  // const [searchParams] = useSearchParams()
  // console.log(searchParams.get('keyword'), 'keyword123')
  const [questionList, setQuestionList] = useState<object[]>(rawQuestionList)
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map((q: any) => {
          const { _id } = q
          return <QuestionCard key={_id} {...q} />
        })}
      </div>
      <div className={styles.footer}>list page footer</div>
    </>
  )
}

export default List
