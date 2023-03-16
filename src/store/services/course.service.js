import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const courseService = {
  getListCourse,
  addCourse,
  deleteCourse,
  getDetailCourse,
  updateCourse,
  getDetailCourseCode,
  activeCourse,
};

function getListCourse(obj) {
  return Vue.$httpEx.post("education/v1/course/listing/rsql", obj, {
    headers: authHeader(),
  });
}

function addCourse(obj) {
  return Vue.$httpEx.put("education/v1/course/append", obj, {
    headers: authHeader(),
  });
}

function deleteCourse(id) {
  return Vue.$httpEx.delete("education/v1/course/by", {
    headers: authHeader(),
  });
}

function getDetailCourse(id) {
  return Vue.$httpEx.get("education/v1/course/raw/by/id?id=" + id, {
    headers: authHeader(),
  });
}

function updateCourse(obj) {
  return Vue.$httpEx.post("education/v1/course/update", obj, {
    headers: authHeader(),
  });
}
function getDetailCourseCode(code) {
  return Vue.$httpEx.get("education/v1/course/by/code?code=" + code, {
    headers: authHeader(),
  });
}

function activeCourse(obj) {
  return Vue.$httpEx.post("education/v1/course/active", obj, {
    headers: authHeader(),
  });
}
