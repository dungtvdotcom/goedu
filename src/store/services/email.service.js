import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const emailService = {
  getSubscribedEmails,
  getSubscribedEmailId,
  createSubscribedEmails,
  updateSubscribedEmails,
  deleteSubscribedEmails,
};

function getSubscribedEmails(obj) {
  return Vue.$httpEx.post("v1/home-page/subscribed-emails/search", obj, {
    header: authHeader(),
  });
}

function getSubscribedEmailId(id) {
  return Vue.$httpEx.get("v1/home-page/subscribed-emails?id=" + id, {
    header: authHeader(),
  });
}

function createSubscribedEmails(obj) {
  return Vue.$httpEx.put("v1/home-page/subscribed-emails", obj, {
    header: authHeader(),
  });
}

function updateSubscribedEmails(obj) {
  return Vue.$httpEx.post("v1/home-page/subscribed-emails", obj, {
    header: authHeader(),
  });
}

function deleteSubscribedEmails(id) {
  return Vue.$httpEx.delete("v1/home-page/subscribed-emails?id=" + id, {
    header: authHeader(),
  });
}
