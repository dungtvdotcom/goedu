import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const libraryService = {
  getListLibrary,
  addFile,
  deleteFile,
  getDetailFile,
  updateFile,
  activeFile,
};

function getListLibrary(obj) {
  return Vue.$httpEx.post("education/v1/template-file/listing", obj, {
    headers: authHeader(),
  });
}

function addFile(obj) {
  return Vue.$httpEx.put("education/v1/template-file", obj, {
    headers: authHeader(),
  });
}

function deleteFile(id) {
  return Vue.$httpEx.delete("education/v1/template-file/" + id, {
    headers: authHeader(),
  });
}

function getDetailFile(id) {
  return Vue.$httpEx.get("education/v1/template-file/" + id, {
    headers: authHeader(),
  });
}

function updateFile(obj) {
  return Vue.$httpEx.post("education/v1/template-file", obj, {
    headers: authHeader(),
  });
}

function activeFile(obj) {
  return Vue.$httpEx.post("education/v1/template-file/active", obj, {
    headers: authHeader(),
  });
}
