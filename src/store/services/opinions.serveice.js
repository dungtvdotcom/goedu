import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const opinionsSevice = {
  getListOpinions,
  getOpinionId,
  updateOpinion,
  createOpinion,
  deleteOpinion,
};

function getListOpinions(obj) {
  return Vue.$httpEx.post("v1/home-page/opinions/search", obj, {
    headers: authHeader(),
  });
}

function getOpinionId(id) {
  return Vue.$httpEx.get("v1/home-page/opinions/?id=" + id, {
    headers: authHeader(),
  });
}
function updateOpinion(obj) {
  return Vue.$httpEx.post("v1/home-page/opinions/", obj, {
    headers: authHeader(),
  });
}

function createOpinion(obj) {
  return Vue.$httpEx.put("v1/home-page/opinions/", obj, {
    headers: authHeader(),
  });
}

function deleteOpinion(id) {
  return Vue.$httpEx.delete("v1/home-page/opinions/?id=" + id, {
    headers: authHeader(),
  });
}
