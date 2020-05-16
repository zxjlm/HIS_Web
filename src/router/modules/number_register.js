/*
 * @Author: your name
 * @Date: 2020-05-14 07:46:07
 * @LastEditTime: 2020-05-15 09:11:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/number_register.js
 */
/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const nestedRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: 'number_register',
  meta: {
    title: '挂号',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/form/manual/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: '窗口挂号' }
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/form/refund/index'),
      meta: { title: '退号处理' }
    }
  ]
}

export default nestedRouter
