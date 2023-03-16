import { recruitmentServices } from "./services/recruitment.service";

export const recruitments = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    getRecruitments({ commit }, obj) {
      return recruitmentServices.getRecruitments(obj);
    },
    getRecruitmentId({ commit }, id) {
      return recruitmentServices.getRecruitmentId(id);
    },
    createRecruitment({ commit }, obj) {
      return recruitmentServices.createRecruitment(obj);
    },
    updateRecruitment({ commit }, obj) {
      return recruitmentServices.updateRecruitment(obj);
    },
    deleteRecruitment({ commit }, id) {
      return recruitmentServices.deleteRecruitment(id);
    },
  },
};
