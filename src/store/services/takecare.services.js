import Vue from 'vue'

import { authHeader } from '../../helpers/auth.helper'

export const takecareService = {
    getListHistory,
    searchCard
}

function getListHistory(obj) {
    return Vue.$httpEx.post("education/v1/lesson-result/listing", obj, {
        headers:authHeader()
    }) 
}
function searchCard(obj) {
    return Vue.$httpEx.post("education/v1/card/listing", obj, {
        headers:authHeader()
    }) 
}