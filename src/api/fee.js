/*
 * @Author: your name
 * @Date: 2020-06-01 17:55:01
 * @LastEditTime: 2020-06-01 17:56:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/api/fee.js
 */
import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/fee/list',
    method: 'get',
    params: query
  })
}
