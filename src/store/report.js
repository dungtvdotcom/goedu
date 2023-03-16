import { reportService } from "./services/report.service";

export const report = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    userCouter({ commit }) {
      let result = reportService.userCouter();
      return result;
    },
    cardCouter({ commit }) {
      let result = reportService.cardCouter();
      return result;
    },
    userDaily({ commit }, obj) {
      let result = reportService.userDaily(obj);
      return result;
    },
    cardDaily({ commit }, obj) {
      let result = reportService.cardDaily(obj);
      return result;
    },
    userCardDaily({ commit }, obj) {
      return reportService.userCardDaily(obj);
    },
  },
};
