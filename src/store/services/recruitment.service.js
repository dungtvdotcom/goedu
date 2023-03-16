import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const recruitmentServices = {
  getRecruitments,
  getRecruitmentId,
  createRecruitment,
  updateRecruitment,
  deleteRecruitment,
};
function getRecruitments(obj) {
  return Vue.$httpEx.post("v1/home-page/recruitments/search", obj, {
    header: authHeader(),
  });
}
function getRecruitmentId(id) {
  return Vue.$httpEx.get("v1/home-page/recruitments?id=" + id, {
    header: authHeader(),
  });
}

function createRecruitment(obj) {
  return Vue.$httpEx.put("v1/home-page/recruitments", obj, {
    header: authHeader(),
  });
}

function updateRecruitment(obj) {
  return Vue.$httpEx.post("v1/home-page/recruitments", obj, {
    header: authHeader(),
  });
}

function deleteRecruitment(id) {
  return Vue.$httpEx.delete("v1/home-page/recruitments?id=" + id, {
    header: authHeader(),
  });
}
