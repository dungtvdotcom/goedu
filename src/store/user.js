import { userService } from "./services/user.service";

export const user = {
  namespaced: true,
  state: {
    user: {},
  },
  getters: {
    userLoged: (state) => state.user,
  },
  actions: {
    getData({ commit }, obj) {
      let result = userService.getListUser(obj);
      return result;
    },
    updateUser({ commit }, obj) {
      let result = userService.updateUser(obj);
      return result;
    },
    addUser({ commit }, obj) {
      let result = userService.addUser(obj);
      return result;
    },
    getDetailUser({ commit }, id) {
      let result = userService.getDetailUser(id);
      return result;
    },
    activeUser({ commit }, obj) {
      let result = userService.activeUser(obj);
      return result;
    },
    activeDocApi({ commit }, obj) {
      let result = userService.activeDocApi(obj);
      return result;
    },
    getInfoUser({ commit }) {
      let result = userService.getInfoUser();
      return result;
    },
    listingWebPermissions({ commit }) {
      return userService.listingWebPermissions();
    },
    searchMobileByFacebook({ commit }, obj) {
      return userService.searchMobileByFacebook(obj);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
};
