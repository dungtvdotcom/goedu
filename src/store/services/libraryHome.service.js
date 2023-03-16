import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";

export const libraryService = {
  getListLibrary,
  getLibraryId,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  uploadStaticFile,
};

function getListLibrary(obj) {
  return Vue.$httpEx.post("v1/home-page/library-files/search", obj, {
    headers: authHeader(),
  });
}

function getLibraryId(id) {
  return Vue.$httpEx.get("v1/home-page/library-files/?id=" + id, {
    headers: authHeader(),
  });
}

function createLibrary(obj) {
  return Vue.$httpEx.put("v1/home-page/library-files/", obj, {
    headers: authHeader(),
  });
}

function updateLibrary(obj) {
  return Vue.$httpEx.post("v1/home-page/library-files/", obj, {
    headers: authHeader(),
  });
}

function deleteLibrary(id) {
  return Vue.$httpEx.delete("v1/home-page/library-files/?id=" + id, {
    headers: authHeader(),
  });
}

function uploadStaticFile(data) {
  let fileName = data.fileName;
  let event = data.event;
  // event.preventDefault();
  if (!fileName) {
      console.log("Not found file name");
      return;
  }
  // TODO do something here to show user that form is being submitted
  let headers = {
      'Content-Type': 'multipart/form-data',
  };
  // event.target is the form
  // let body = new URLSearchParams(new FormData(event.target));
  let body = new FormData(event.target);
  //event.target.action
  return Vue.$httpEx.put('/v1/home-page/library-files/static-file/upload', body, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      headers: headers
  });
}
