import { httpGet, httpPost, httpPut, httpDelete } from '../quest'

// 获取角色列表
export function getRoleListAll() {
    return httpGet('/api/private/v1/roles')
}

// 添加角色信息
export function addRoleData(data) {
    return httpPost('/api/private/v1/roles', {
        roleName: data.role_name,
        roleDesc: data.role_desc
    })
}

// 删除指定权限
export function deletePowerById(rolesId, rightsId) {
    return httpDelete(`/api/private/v1/roles/${rolesId}/rights/${rightsId}`)
}

// 按照ID获取角色信息
export function getRoleById(id) {
    return httpGet(`/api/private/v1/roles/${id}`)
}

// 根据id修改角色信息
export function questEditRolesById(id) {
    return httpPut(`/api/private/v1/roles/${id}`)
}

// 根据id删除角色信息
export function deleteRolesById(id) {
    return httpDelete(`/api/private/v1/roles/${id}`)
}


// 获取权限列表
export function getPowerList() {
    return httpGet('/api/private/v1/rights/list')
}
