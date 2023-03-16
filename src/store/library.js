import { libraryService } from "./services/library.service";

export const library = {
  namespaced: true,
  state: {},
  actions: {
    getListLibrary({ commit }, obj) {
      let result = libraryService.getListLibrary(obj);
      return result;
    },
    addFile({ commit }, obj) {
      let result = libraryService.addFile(obj);
      return result;
    },
    deleteFile({ commit }, id) {
      let result = libraryService.deleteFile(id);
      return result;
    },
    getDetailFile({ commit }, id) {
      let result = libraryService.getDetailFile(id);
      return result;
    },
    updateFile({ commit }, obj) {
      let result = libraryService.updateFile(obj);
      return result;
    },
    activeFile({ commit }, obj) {
      let result = libraryService.activeFile(obj);
      return result;
    },
  },
};
