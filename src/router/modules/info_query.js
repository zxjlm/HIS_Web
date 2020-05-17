/*
 * @Author: your name
 * @Date: 2020-05-15 09:00:51
 * @LastEditTime: 2020-05-17 09:22:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/info_query.js
 */
import Layout from '@/layout'

const infoRouter = {
  path: '/info_query',
  component: Layout,
  redirect: '/info_query/menu1/menu1-1',
  name: 'info_query',
  meta: {
    title: '信息查询',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/query/register_number/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: '患者挂号信息查询' }
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/query/docter_assign/index'),
      meta: { title: '医生排班信息查询' }
    },
    {
      path: 'menu3',
      name: 'Menu3',
      component: () => import('@/views/query/patient_charge/index'),
      meta: { title: '患者费用查询' }
    },
    {
      path: 'menu4',
      name: 'Menu4',
      component: () => import('@/views/query/patient_info/index'),
      meta: { title: '病人基本信息' }
    },
    {
      path: 'menu5',
      name: 'Menu5',
      component: () => import('@/views/query/fapiao/index'),
      meta: { title: '发票查询' }
    }
  ]
}

export default infoRouter
