import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const lessonService = {
  getListLesson,
  getDetailLesson,
  updateLesson,
  activeLesson,
  addLesson,
  lessonResultDaily,
};

function getListLesson(obj) {
  return Vue.$httpEx.post("education/v1/lesson/listing/rsql", obj, {
    headers: authHeader(),
  });
}

function getDetailLesson(id) {
  return Vue.$httpEx.get("education/v1/lesson/raw/by/id?id=" + id, {
    headers: authHeader(),
  });
}

function updateLesson(obj) {
  return Vue.$httpEx.post("education/v1/lesson", obj, {
    headers: authHeader(),
  });
}

function activeLesson(obj) {
  return Vue.$httpEx.post("education/v1/lesson/active", obj, {
    headers: authHeader(),
  });
}

function addLesson(obj) {
  return Vue.$httpEx.put("education/v1/lesson", obj, {
    headers: authHeader(),
  });
}

function lessonResultDaily(obj) {
  return Vue.$httpEx.post("education/v1/lesson-result/listing/daily", obj, {
    headers: authHeader(),
  });
}
