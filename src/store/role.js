import { roleService } from "./services/role.service";

export const role = {
    namespaced: true,
    state: {
        
    },
    getters: {},
    actions: {
        getListRole({ commit }, obj) {
            let result = roleService.getListRole(obj);
            return result
        },
        updateRole({ commit }, obj) {
            let result = roleService.updateRole(obj);
            return result
        },
        getDetailRole({commit},id) {
            let result = roleService.getDetailRole(id);
            return result
        },
        addRole({ commit }, obj) {
            let result = roleService.addRole(obj);
            return result
        },
        deleteRole({ commit }, id) {
            let result = roleService.deleteRole(id);
            return result
        },
        getRoleUser({ commit }, obj) {
            let result = roleService.getRoleUser(obj);
            return result
        },
        addRoleUser({commit},obj) {
            let result = roleService.addRoleUser(obj);
            return result
        },
        deleteRoleUser({commit},obj) {
            let result = roleService.deleteRoleUser(obj);
            return result
        }
    }
}