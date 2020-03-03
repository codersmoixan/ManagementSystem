import {httpGet, httpPost, httpPut, httpDelete} from '../quest'
/**
 * 用户管理
 * 
 */

 // 获取全部用户列表
 export function getUserDataAll(data) {
     return httpGet('/api/private/v1/users', {
         query: data.query,
         pagenum: data.pagenum,
         pagesize: data.pagesize
     })
 }

 // 添加用户信息
 export function addUserData(data) {
     return httpPost('/api/private/v1/users', data)
 }

 // 修改用户信息
 export function editUserData(data) {
     return httpPut('/api/private/v1/users/' + data.id, {
         email: data.email,
         mobile: data.phone
     })
 }

 // 删除用户信息
 export function deleteUserData(id) {
     return httpDelete(`/api/private/v1/users/${id}`)
 }
