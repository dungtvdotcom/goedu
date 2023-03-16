import Vue from "vue";

import { authHeader } from "../../helpers/auth.helper";
import { convert_obj_to_query_url } from "../../helpers/convert_helper";

export const codeService = {
  getListCode,
  addCode,
  downLoad,
  listActived,
  activeCode,
  submitFile,
  listUserCard,
  listUserCourse,
  swappingUserCard,
};

function getListCode(obj) {
  return Vue.$httpEx.post("education/v1/card/listing", obj, {
    headers: authHeader(),
  });
}

function addCode(file) {
  return Vue.$httpEx.post("education/v1/card/generator/upload/admin", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function downLoad(obj) {
  return Vue.$httpEx.get(
    "education/v1/card/generator/csv/admin?" + convert_obj_to_query_url(obj),
    {
      headers: authHeader(),
      responseType: "blob",
    }
  );
}
function listActived(obj) {
  return Vue.$httpEx.post("education/v1/card/active/logging/listing", obj, {
    headers: authHeader(),
  });
}

function activeCode(obj) {
  return Vue.$httpEx.post("education/v1/card/active", obj, {
    headers: authHeader(),
  });
}

function submitFile(fileName, event) {
  let headers = {
    "Content-Type": "multipart/form-data",
  };
  let body = new FormData(event.target);

  return Vue.$httpEx.post("education/v1/card/generator/upload/admin", body, {
    method: "POST",
    mode: "no-cors",
    redirect: "follow",
    headers: headers,
  });
}

function listUserCard(obj) {
  return Vue.$httpEx.post("education/v1/user-card/listing-view", obj, {
    headers: authHeader(),
  });
}

function listUserCourse(obj) {
  return Vue.$httpEx.post("admin/account/v1/user/listing-course-view", obj, {
    headers: authHeader(),
  });
}

function swappingUserCard(obj) {
  return Vue.$httpEx.post("education/v1/user-card/swapping", obj, {
    headers: authHeader(),
  });
}
