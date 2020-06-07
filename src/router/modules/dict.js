/*
 * @Author: your name
 * @Date: 2020-06-06 09:41:49
 * @LastEditTime: 2020-06-06 12:53:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/router/modules/dict.js
 */

import Layout from '@/layout'

const dictRouter = {
  path: '/dict',
  component: Layout,
  redirect: '/dict/menu1/menu1-1',
  name: '/dict',
  meta: {
    title: '字典表维护',
    icon: 'component'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/dict/sex/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: '性别表' }
    }, {
      path: 'menu2',
      component: () => import('@/views/dict/blood_type/index'), // Parent router-view
      name: 'Menu2',
      meta: { title: '血型表' }
    }, {
      path: 'menu3',
      component: () => import('@/views/dict/all'), // Parent router-view
      name: 'Menu3',
      meta: { title: '稀有血型表' }
    },
    {
      path: 'menu4',
      component: () => import('@/views/dict/all'), // Parent router-view
      name: 'Menu4',
      meta: { title: '收费类型表' }
    },
    {
      path: 'menu5',
      component: () => import('@/views/dict/all'), // Parent router-view
      name: 'Menu5',
      meta: { title: '受教育程度表' }
    },
    {
      path: 'menu6',
      component: () => import('@/views/dict/all'), // Parent router-view
      name: 'Menu6',
      meta: { title: '身份类型表' }
    },
    {
      path: 'menu7',
      component: () => import('@/views/dict/all'), // Parent router-view
      name: 'Menu7',
      meta: { title: '国籍表' }
    },
    {
      path: 'menu8',
      component: () => import('@/views/dict/all'), // Parent router-view
      name: 'Menu8',
      meta: { title: '联系人关系表' }
    },
    {
      path: 'menu9',
      component: () => import('@/views/dict/all'), // Parent router-view
      name: 'Menu9',
      meta: { title: '婚姻状况表' }
    }
  ]
}

export default dictRouter
