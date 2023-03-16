import { authService } from "./services/auth.service";

export const auth = {
  namespaced: true,
  state: {
    auth: null,
  },
  getters: {
    getterAuth(state) {
      return state.auth;
    },
  },
  actions: {
    async getAuth({ commit }, obj) {
      return await authService.getAuth(obj);
    },
  },
  mutations: {
    getAuth(state, data) {
      state.auth = data;
    },
  },
};
