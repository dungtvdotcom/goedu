import { libraryService } from "./services/libraryHome.service";

export const libraryHome = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    getListLibrary({ commit }, obj) {
      return libraryService.getListLibrary(obj);
    },
    getLibraryId({ commit }, id) {
      return libraryService.getLibraryId(id);
    },
    createLibrary({ commit }, obj) {
      return libraryService.createLibrary(obj);
    },
    updateLibrary({ commit }, obj) {
      return libraryService.updateLibrary(obj);
    },
    deleteLibrary({ commit }, id) {
      return libraryService.deleteLibrary(id);
    },
    uploadStaticFile({ commit }, data) {
      return libraryService.uploadStaticFile(data);
    },
  },
};
