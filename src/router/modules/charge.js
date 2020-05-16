/*
 * @Author: your name
 * @Date: 2020-05-16 09:04:01
 * @LastEditTime: 2020-05-16 16:07:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/charge.js
 */
import Layout from '@/layout'

const chargeRouter = {
  path: '/charge',
  component: Layout,
  redirect: '/charge/menu1/menu1-1',
  name: 'charge',
  meta: {
    title: '收费',
    icon: 'chart'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/charge/drug/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: '药品收费' }
    }, {
      path: 'menu2',
      component: () => import('@/views/charge/inspection/index'), // Parent router-view
      name: 'Menu2',
      meta: { title: '检查项目收费' }
    }, {
      path: 'menu3',
      component: () => import('@/views/charge/paper/index'), // Parent router-view
      name: 'Menu3',
      meta: { title: '打印收费凭据' }
    }
  ]
}

export default chargeRouter
