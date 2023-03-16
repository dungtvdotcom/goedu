import Vue from "vue";
import { authHeader } from "../../helpers/auth.helper";

export const userService = {
  getListUser,
  updateUser,
  addUser,
  getDetailUser,
  activeUser,
  activeDocApi,
  getInfoUser,
  listingWebPermissions,
  searchMobileByFacebook,
};

function getListUser(obj) {
  return Vue.$httpEx.post("admin/account/v1/user/listing", obj, {
    headers: authHeader(),
  });
}

function updateUser(obj) {
  return Vue.$httpEx.post("admin/account/v1/user/update", obj, {
    headers: authHeader(),
  });
}

function addUser(obj) {
  return Vue.$httpEx.post("admin/account/v1/user/register", obj, {
    headers: authHeader(),
  });
}

function getDetailUser(id) {
  return Vue.$httpEx.get("admin/account/v1/user/info/id?user_id=" + id, {
    headers: authHeader(),
  });
}

function activeUser(obj) {
  return Vue.$httpEx.post("admin/account/v1/user/active", obj, {
    headers: authHeader(),
  });
}

function activeDocApi(obj) {
  return Vue.$httpEx.post("admin/account/v1/user/update/apidoc", obj, {
    headers: authHeader(),
  });
}

function getInfoUser() {
  return Vue.$httpEx.get(
    "admin/account/v1/user/info",
    {},
    {
      headers: authHeader(),
    }
  );
}

function listingWebPermissions() {
  return Vue.$httpEx.get(
    "admin/account/v1/policy-rules/permissions/listing-web",
    {}
  );
}

function searchMobileByFacebook(obj) {
  return Vue.$httpEx.post("facebook/v1/search/mobile", obj, {});
}
