import { blogService } from "./services/blogs.service";

export const blogs = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    getBlogs({ commit }, obj) {
      return blogService.getBlogs(obj);
    },
    getBlogId({ commit }, id) {
      return blogService.getBlogId(id);
    },
    createBlogs({ commit }, obj) {
      return blogService.createBlogs(obj);
    },
    updateBlogs({ commit }, obj) {
      return blogService.updateBlogs(obj);
    },
    deleteBlogs({ commit }, id) {
      return blogService.deleteBlogs(id);
    },
  },
};
