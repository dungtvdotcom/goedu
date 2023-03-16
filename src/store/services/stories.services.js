import Vue from "vue";

import { authHeader } from "./../../helpers/auth.helper";

export const storiesService = {
  getStories,
  deleteStory,
  updateStory,
  getStoryId,
  createStory,
};

function getStories(obj) {
  return Vue.$httpEx.post("v1/home-page/stories/search", obj, {
    headers: authHeader(),
  });
}

function deleteStory(id) {
  return Vue.$httpEx.delete("v1/home-page/stories/?id=" + id, {
    headers: authHeader(),
  });
}

function updateStory(obj) {
  return Vue.$httpEx.post("v1/home-page/stories", obj, {
    headers: authHeader(),
  });
}

function createStory(obj) {
  return Vue.$httpEx.put("v1/home-page/stories/", obj, {
    headers: authHeader(),
  });
}
function getStoryId(id) {
  return Vue.$httpEx.get("v1/home-page/stories/?id=" + id, {
    headers: authHeader(),
  });
}
