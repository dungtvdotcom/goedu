import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const blogService = {
  getBlogs,
  createBlogs,
  updateBlogs,
  deleteBlogs,
  getBlogId,
};

function getBlogs(obj) {
  return Vue.$httpEx.post("/v1/home-page/blogs/search", obj, {
    headers: authHeader(),
  });
}

function getBlogId(id) {
  return Vue.$httpEx.get("v1/home-page/blogs/?id=" + id, {
    headers: authHeader(),
  });
}

function createBlogs(obj) {
  return Vue.$httpEx.put("v1/home-page/blogs/", obj, {
    headers: authHeader(),
  });
}

function updateBlogs(obj) {
  return Vue.$httpEx.post("/v1/home-page/blogs/", obj, {
    headers: authHeader(),
  });
}

function deleteBlogs(id) {
  return Vue.$httpEx.delete("v1/home-page/blogs/?id=" + id, {
    headers: authHeader(),
  });
}
