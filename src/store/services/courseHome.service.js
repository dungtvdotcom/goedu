import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const courseHomeService = {
  getListCourseHome,
  getListCourseHomeId,
  createCourseHome,
  updateCourseHome,
  deleteCourseHome,
};
function getListCourseHome(obj) {
  return Vue.$httpEx.post("v1/home-page/courses/search", obj, {
    headers: authHeader(),
  });
}

function getListCourseHomeId(id) {
  return Vue.$httpEx.get("v1/home-page/courses/?id=" + id, {
    headers: authHeader(),
  });
}

function createCourseHome(obj) {
  return Vue.$httpEx.put("v1/home-page/courses/", obj, {
    headers: authHeader(),
  });
}

function updateCourseHome(obj) {
  return Vue.$httpEx.post("v1/home-page/courses/", obj, {
    headers: authHeader(),
  });
}

function deleteCourseHome(id) {
  return Vue.$httpEx.delete("v1/home-page/courses/?id=" + id, {
    headers: authHeader(),
  });
}
