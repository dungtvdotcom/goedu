import { courseHomeService } from "./services/courseHome.service";

export const courseHome = {
  namespaced: true,
  state: {},
  actions: {
    getListCourseHome({ commit }, obj) {
      return courseHomeService.getListCourseHome(obj);
    },
    getListCourseHomeId({ commit }, id) {
      return courseHomeService.getListCourseHomeId(id);
    },
    createCourseHome({ commit }, obj) {
      return courseHomeService.createCourseHome(obj);
    },
    updateCourseHome({ commit }, obj) {
      return courseHomeService.updateCourseHome(obj);
    },
    deleteCourseHome({ commit }, id) {
      return courseHomeService.deleteCourseHome(id);
    },
  },
};
