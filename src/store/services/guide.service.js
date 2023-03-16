import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const guideService = {
  guideCourse,
  guideSearch,
  getDetailGuide,
  deleteGuide,
  updateGuide,
};

function guideCourse(obj) {
  return Vue.$httpEx.post("account/v1/guide/append", obj, {});
}

function guideSearch(obj) {
  return Vue.$httpEx.post("account/v1/guide/search/keyword", obj, {
    headers: authHeader(),
  });
}

function getDetailGuide(id) {
  return Vue.$httpEx.post("account/v1/guide/get/html", id, {
    headers: authHeader(),
  });
}

function deleteGuide(id) {
  return Vue.$httpEx.delete("account/v1/guide/by?id=" + id, {
    headers: authHeader(),
  });
}

function updateGuide(obj) {
  return Vue.$httpEx.post("account/v1/guide/update", obj, {
    headers: authHeader(),
  });
}
