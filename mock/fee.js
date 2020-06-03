/*
 * @Author: your name
 * @Date: 2020-06-01 17:53:02
 * @LastEditTime: 2020-06-01 18:44:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/mock/fee.js
 */
import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    patient: '@first',
    doctor: '@first',
    content_short: 'mock data',
    use_money: '@float(1000, 100000, 2, 2)',
    content: baseContent,
    // importance: '@integer(1, 3)',
    'type|1': ['胸外科', '骨科', '神经内科'],
    'dept': '@int(10001,99999)',
    'status|1': ['进行中', '已完成', '已退款'],
    'fee_type|1': ['检查', '挂号', '药品', '其他'],
    'pay_type|1': ['支付宝', '微信', '银行卡', '现金', '其他'],
    'staff|1': ['风清扬', '任我行', '独孤求败'],
    display_time: '@datetime',
    comment_disabled: true,
    'pageviews|1': '@float(20, 1000, 2, 2)',
    platforms: ['a-platform'],
    sum_drug: '@float(10000, 1000000, 2, 2)',
    sum_check: '@float(5000, 100000, 2, 2)',
    sum_register: '@float(1000, 10000, 2, 2)',
    sum_other: '@float(10000, 500000, 2, 2)',
    peo_number: '@int(100, 10000)',
    rank: '@int(0, 10)'
  }))
}

export default [
  {
    url: '/vue-element-admin/fee/list',
    type: 'get',
    response: config => {
      const { use_money, type, patient, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (use_money && item.importance !== +use_money) return false
        if (type && item.type !== type) return false
        if (patient && item.author.indexOf(patient) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  }

]

