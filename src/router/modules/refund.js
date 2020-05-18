/*
 * @Author: your name
 * @Date: 2020-05-16 15:46:20
 * @LastEditTime: 2020-05-18 09:45:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/refund.js
 */
import Layout from '@/layout'

const refundRouter = {
  path: '/refund',
  component: Layout,
  redirect: '/refund/menu1/menu1-1',
  name: 'refund',
  meta: {
    title: '退款',
    icon: 'money'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/refund/all/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: '退款' }
    }
  ]
}

export default refundRouter
