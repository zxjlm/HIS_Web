/*
 * @Author: your name
 * @Date: 2020-05-15 16:09:31
 * @LastEditTime: 2020-05-16 09:08:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/fee.js
 */
import Layout from '@/layout'

const feeRouter = {
  path: '/fee',
  component: Layout,
  redirect: '/fee/menu1/menu1-1',
  name: 'fee',
  meta: {
    title: '费用管理',
    icon: 'component'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/fee/register_number/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: '挂号费用管理' }
    }, {
      path: 'menu2',
      component: () => import('@/views/fee/drug/index'), // Parent router-view
      name: 'Menu2',
      meta: { title: '药品费用管理' }
    }
  ]
}

export default feeRouter
