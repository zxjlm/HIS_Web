/*
 * @Author: your name
 * @Date: 2020-05-15 10:11:16
 * @LastEditTime: 2020-05-15 10:26:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/mock/doctor_assign.js
 */
// /*
//  * @Author: your name
//  * @Date: 2020-05-15 10:11:16
//  * @LastEditTime: 2020-05-15 10:12:16
//  * @LastEditors: Please set LastEditors
//  * @Description: In User Settings Edit
//  * @FilePath: /vue-element-admin/mock/doctor_assign.js
//  */
// import Mock from 'mockjs'

// const List = []
// const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

// for (let i = 0; i < count; i++) {
//   List.push(Mock.mock({
//     id: '@increment',
//     timestamp: +Mock.Random.date('T'),
//     author: '@first',
//     doctor: '@first',
//     title: '@title(5, 10)',
//     content_short: 'mock data',
//     content: baseContent,
//     forecast: '@float(0, 100, 2, 2)',
//     // importance: '@integer(1, 3)',
//     'type|1': ['胸外科', '骨科', '神经内科'],
//     'status|1': ['running', 'complete', 'refund'],
//     'register_way|1': ['窗口挂号', '电话挂号', '预约挂号', '自动挂号'],
//     display_time: '@datetime',
//     comment_disabled: true,
//     'pageviews|1': [20, 25, 50],
//     image_uri,
//     platforms: ['a-platform']
//   }))
// }

// export default [
//   {
//     url: '/vue-element-admin/docter_assign/list',
//     type: 'get',
//     response: config => {
//       const { importance, type, author, page = 1, limit = 20, sort } = config.query

//       let mockList = List.filter(item => {
//         if (importance && item.importance !== +importance) return false
//         if (type && item.type !== type) return false
//         if (author && item.author.indexOf(author) < 0) return false
//         return true
//       })

//       if (sort === '-id') {
//         mockList = mockList.reverse()
//       }

//       const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//       return {
//         code: 20000,
//         data: {
//           total: mockList.length,
//           items: pageList
//         }
//       }
//     }
//   }
// ]

