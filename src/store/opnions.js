import { opinionsSevice } from "./services/opinions.serveice";

export const opnions = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    getListOpinions({ commit }, obj) {
      return opinionsSevice.getListOpinions(obj);
    },
    getOpinionId({ commit }, id) {
      return opinionsSevice.getOpinionId(id);
    },
    updateOpinion({ commit }, obj) {
      return opinionsSevice.updateOpinion(obj);
    },
    createOpinion({ commit }, obj) {
      return opinionsSevice.createOpinion(obj);
    },
    deleteOpinion({ commit }, id) {
      return opinionsSevice.deleteOpinion(id);
    },
  },
};
