import { guideService } from "./services/guide.service";

export const guide = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    guideCourse({ commit }, obj) {
      let result = guideService.guideCourse(obj);
      return result;
    },
    searchMobileByFacebook({ commit }, obj) {
      return guideService.searchMobileByFacebook(obj);
    },
    guideSearch({ commit }, obj) {
      return guideService.guideSearch(obj);
    },
    getDetailGuide({ commit }, id) {
      return guideService.getDetailGuide(id);
    },
    deleteGuide({ commit }, id) {
      return guideService.deleteGuide(id);
    },
    updateGuide({ commit }, obj) {
      return guideService.updateGuide(obj);
    },
  },
  mutations: {},
};
