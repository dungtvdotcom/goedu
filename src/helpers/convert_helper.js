export const convert_obj_to_query_url = function (obj) {
    if (typeof obj !== 'object' || obj === null) return null
    // var obj = {value1: 'prop1', value2: 'prop2', value3: 'prop3'};
    let arr = []
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key + '=' + obj[key])
        }
    }
    let result = arr.join('&')
    return result
}