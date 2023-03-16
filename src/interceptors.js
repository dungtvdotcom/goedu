// import { from } from "core-js/fn/array";
import Vue from "vue"
import { authHeader } from "./helpers/auth.helper"
import {URL } from "./config"
import  router  from "./router"

function handleSuccessResponse(response) {
    if (response.ok && response.status >= 200 && response.status <= 300) {
        return Promise.resolve(response);
    } else if (response.status == 401 || response.status == 403) {
        localStorage.removeItem("user_loged");
        if (response.url != '/login') {
            router.push("/login");
        }
        else {
            return Promise.reject(response);
        }
    }
    else {
        return Promise.reject(response);
    }
}

function handleFailedResponse(response) {
    if (response.status == 401 || response.status == 403) {
        localStorage.removeItem("user_loged");
        if (response.url != '/login') {
            router.push("/login");
        }
        else {
            return Promise.reject(response);
        }
    }
    else {
        return Promise.reject(response);
    }
}
function putMethod(uri, body, config) {
  uri = URL.ROOT + uri;
  if (!config || !config.headers) {
    config = {}
    config.headers = { ...authHeader() };
  } else {
    config.headers = Object.assign(config.headers, authHeader());
  }
  return Vue.http.put(uri, body, config)
    .then(handleSuccessResponse, handleFailedResponse);
}


function postMethod(uri, body, config) {
    uri = URL.ROOT + uri;
    if (!config || !config.headers) {
        config = {}
        config.headers = { ...authHeader() };
    } else {
        config.headers = Object.assign(config.headers, authHeader());
    }
    return Vue.http.post(uri, body, config)
        .then(handleSuccessResponse, handleFailedResponse);
}

function getMethod(uri, config) {
    uri = URL.ROOT + uri;
  if (!config || !config.headers) {
        config = {}
        config.headers = { ...authHeader() };
    } else {
        config.headers = Object.assign(config.headers, authHeader());
    }
    return Vue.http.get(uri, config)
        .then(handleSuccessResponse, handleFailedResponse);
}

function deleteMethod(uri, config) {
    uri = URL.ROOT + uri;
    if (!config || !config.headers) {
        config = {}
        config.headers = { ...authHeader() };
    } else {
        config.headers = Object.assign(config.headers, authHeader());
    }
    return Vue.http.delete(uri, config)
        .then(handleSuccessResponse, handleFailedResponse);
}

export const myHTTP = {
    post: postMethod,
    get: getMethod,
    delete: deleteMethod,
    put: putMethod
}
