import moduleName, { takecareService } from './services/takecare.services';

export const takecare = {
    namespaced: true,
    state: {
        
    },
    actions: {
        getListHistory({commit},obj) {
            let result = takecareService.getListHistory(obj);
            return result
        },
        searchCard({ commit }, obj) {
            let result = takecareService.searchCard(obj);
            return result
        }
    }
}