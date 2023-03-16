import Vue from "vue";

import { URL } from "../../config"

export const authService = {
    getAuth
}

function getAuth(obj) {
    const headers = {
        ...obj
    }
    return Vue.http.get(URL.ROOT + "account/v1/authorize/token", {
        headers:headers
    })
}