import { codeService } from "./services/code.service";

export const code = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    getListCode({ commit }, obj) {
      let result = codeService.getListCode(obj);
      return result;
    },
    addCode({ commit }, file) {
      let result = codeService.addCode(file);
      return result;
    },
    downLoad({ commit }, obj) {
      let result = codeService.downLoad(obj);
      return result;
    },
    listActived({ commit }, obj) {
      let result = codeService.listActived(obj);
      return result;
    },
    activeCode({ commit }, obj) {
      let result = codeService.activeCode(obj);
      return result;
    },
    listUserCard({ commit }, obj) {
      let result = codeService.listUserCard(obj);
      return result;
    },
    listUserCourse({ commit }, obj) {
      let result = codeService.listUserCourse(obj);
      return result;
    },
    swappingUserCard({ commit }, obj) {
      return codeService.swappingUserCard(obj);
    },
  },
};
