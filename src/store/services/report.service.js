import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const reportService = {
  userCouter,
  cardCouter,
  userDaily,
  cardDaily,
  userCardDaily,
};

function userCouter() {
  return Vue.$httpEx.get("report/v1/user/counter/reporting", {
    headers: authHeader(),
  });
}

function cardCouter() {
  return Vue.$httpEx.get("report/v1/card/counter/reporting", {
    headers: authHeader(),
  });
}

function userDaily(obj) {
  return Vue.$httpEx.post("report/v1/user/daily/reporting", obj, {
    headers: authHeader(),
  });
}

function cardDaily(obj) {
  return Vue.$httpEx.post("report/v1/card/daily/reporting", obj, {
    headers: authHeader(),
  });
}

function userCardDaily(obj) {
  return Vue.$httpEx.post("report/v1/used-card/daily/reporting", obj, {
    headers: authHeader(),
  });
}
