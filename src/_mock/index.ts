import * as Mock from 'mockjs'
// mock.js 只能劫持XMLHttpRequest 请求，无法劫持 fetch 请求
// 不建议直接在前端项目使用
console.log(Mock, 'MockMockMockMockMockMock')
Mock.mock('/api/test', 'get', () => {
  return {
    errno: 0,
    data: {
      name: `hello Mock ${Date.now()}`,
    },
  }
})
