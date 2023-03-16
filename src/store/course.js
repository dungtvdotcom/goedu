import { courseService } from "./services/course.service";

export const course = {
  namespaced: true,
  state: {},
  actions: {
    getListCourse({ commit }, obj) {
      let result = courseService.getListCourse(obj);
      return result;
    },
    addCourse({ commit }, obj) {
      let result = courseService.addCourse(obj);
      return result;
    },
    deleteCourse({ commit }, id) {
      let result = courseService.deleteCourse(id);
      return result;
    },
    getDetailCourse({ commit }, id) {
      let result = courseService.getDetailCourse(id);
      return result;
    },
    updateCourse({ commit }, obj) {
      let result = courseService.updateCourse(obj);
      return result;
    },
    getDetailCourseCode({ commit }, code) {
      let result = courseService.getDetailCourseCode(code);
      return result;
    },
    activeCourse({ commit }, obj) {
      let result = courseService.activeCourse(obj);
      return result;
    },
  },
};
