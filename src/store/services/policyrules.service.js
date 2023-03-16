import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";
import { convert_obj_to_query_url } from "../../helpers/convert_helper";
export const policyRulesService = {
  getListPermisson,
  getPolicyRules,
  getDetails,
  addPolicyRules,
  updatePolicyRules,
  deletePolicyRules,
  getUserPermission,
  addPermission,
  getDetailsPermission,
  updatePermission,
  deletePermission,
};

function getListPermisson(obj) {
  return Vue.$httpEx.post(
    "admin/account/v1/policy-rules/permissions/listing",
    obj,
    {
      headers: authHeader(),
    }
  );
}

function getPolicyRules(obj) {
  return Vue.$httpEx.post("/admin/account/v1/policy-rules/listing", obj, {
    headers: authHeader(),
  });
}

function getDetails(id) {
  return Vue.$httpEx.get("admin/account/v1/policy-rules?role_id=" + id, {
    headers: authHeader(),
  });
}

function addPolicyRules(obj) {
  return Vue.$httpEx.put("admin/account/v1/policy-rules", obj, {
    headers: authHeader(),
  });
}

function updatePolicyRules(obj) {
  return Vue.$httpEx.post("admin/account/v1/policy-rules", obj, {
    headers: authHeader(),
  });
}

function deletePolicyRules(obj) {
  return Vue.$httpEx.delete(
    "admin/account/v1/policy-rules?" + convert_obj_to_query_url(obj),
    {
      headers: authHeader(),
    }
  );
}

function getUserPermission(obj) {
  return Vue.$httpEx.post(
    "admin/account/v1/policy-rules/user-permission/listing/view",
    obj,
    {
      headers: authHeader(),
    }
  );
}

function addPermission(obj) {
  return Vue.$httpEx.put("admin/account/v1/permissions", obj, {
    headers: authHeader(),
  });
}

function getDetailsPermission(id) {
  return Vue.$httpEx.get("admin/account/v1/permissions?permission_id=" + id, {
    headers: authHeader(),
  });
}

function updatePermission(obj) {
  return Vue.$httpEx.post("admin/account/v1/permissions", obj, {
    headers: authHeader(),
  });
}

function deletePermission(id) {
  return Vue.$httpEx.delete(
    "admin/account/v1/permissions?permission_id=" + id,
    {
      headers: authHeader(),
    }
  );
}
