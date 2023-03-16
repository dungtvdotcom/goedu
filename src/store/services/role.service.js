import Vue  from "vue";

import { authHeader } from "./../../helpers/auth.helper";

export const roleService = {
    getListRole,
    updateRole,
    getDetailRole,
    addRole,
    deleteRole,
    getRoleUser,
    addRoleUser,
    deleteRoleUser
}

function getListRole(obj) {
    return Vue.$httpEx.post("admin/account/v1/role/listing", obj, {
        headers:authHeader()
    })
}

function getDetailRole(id) {
     return Vue.$httpEx.get("admin/account/v1/role?role_id=" + id, {
        headers:authHeader()
    }) 
}

function updateRole(obj) {
    return Vue.$httpEx.post("admin/account/v1/role", obj, {
        headers: authHeader()
    })
}

function addRole(obj) {
    return Vue.$httpEx.put("admin/account/v1/role", obj, {
         headers: authHeader()
    })
}

function deleteRole(id) {
    return Vue.$httpEx.delete("admin/account/v1/role?role_id="+ id, {
        headers: authHeader()
    })
}

function getRoleUser(obj) {
    return Vue.$httpEx.post("admin/account/v1/roleUserRel/listing/view", obj, {
        headers:authHeader()
    })
}

function addRoleUser(obj) {
    return Vue.$httpEx.put("admin/account/v1/roleUserRel", obj, {
         headers: authHeader()
    })
}
function deleteRoleUser(obj) {
    return Vue.$httpEx.delete("admin/account/v1/roleUserRel?role_id="+obj.roleId+"&user_id="+obj.userId, {
        headers: authHeader()
    })
}
