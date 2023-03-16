export const authHeader = () => {
    let token = localStorage.getItem('user_loged');
    let obj = {
        'Authorization': token,
        'client-id': 'VP3CPVsyEiGCqTn1CXcwotBc1BL5oP1x',
        'client-secret': '81jiwAcOSNGF01smtRxcEh1fm5Z8J6mr',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With"
    }

    return obj;
}