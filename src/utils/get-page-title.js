/*
 * @Author: your name
 * @Date: 2020-05-14 07:46:07
 * @LastEditTime: 2020-05-18 09:51:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-element-admin/src/utils/get-page-title.js
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '苏北人民医院'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
