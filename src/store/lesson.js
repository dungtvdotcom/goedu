import { lessonService } from "./services/lesson.service";

export const lesson = {
  namespaced: true,
  state: {},
  actions: {
    getListLesson({ commit }, obj) {
      let result = lessonService.getListLesson(obj);
      return result;
    },
    getDetailLesson({ commit }, id) {
      let result = lessonService.getDetailLesson(id);
      return result;
    },
    updateLesson({ commit }, obj) {
      let result = lessonService.updateLesson(obj);
      return result;
    },
    activeLesson({ commit }, obj) {
      let result = lessonService.activeLesson(obj);
      return result;
    },
    addLesson({ commit }, obj) {
      let result = lessonService.addLesson(obj);
      return result;
    },
    lessonResultDaily({ commit }, obj) {
      return lessonService.lessonResultDaily(obj);
    },
  },
};
