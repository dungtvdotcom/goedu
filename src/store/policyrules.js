import { policyRulesService } from "./services/policyrules.service";

export const policy = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    getListPermisson({ commit }, obj) {
      let result = policyRulesService.getListPermisson(obj);
      return result;
    },

    getPolicyRules({ commit }, obj) {
      let result = policyRulesService.getPolicyRules(obj);
      return result;
    },

    getDetails({ commit }, id) {
      let result = policyRulesService.getDetails(id);
      return result;
    },
    addPolicyRules({ commit }, obj) {
      let result = policyRulesService.addPolicyRules(obj);
      return result;
    },
    updatePolicyRules({ commit }, obj) {
      let result = policyRulesService.updatePolicyRules(obj);
      return result;
    },

    deletePolicyRules({ commit }, obj) {
      let result = policyRulesService.deletePolicyRules(obj);
      return result;
    },

    getUserPermission({ commit }, obj) {
      let result = policyRulesService.getUserPermission(obj);
      return result;
    },

    addPermission({ commit }, obj) {
      let result = policyRulesService.addPermission(obj);
      return result;
    },

    getDetailsPermission({ commit }, id) {
      let result = policyRulesService.getDetailsPermission(id);
      return result;
    },
    updatePermission({ commit }, obj) {
      let result = policyRulesService.updatePermission(obj);
      return result;
    },
    deletePermission({ commit }, id) {
      let result = policyRulesService.deletePermission(id);
      return result;
    },
  },
};
