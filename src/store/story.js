import { storiesService } from "./services/stories.services";

export const stories = {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    getStories({ commit }, obj) {
      return storiesService.getStories(obj);
    },
    deleteStory({ commit }, id) {
      return storiesService.deleteStory(id);
    },
    updateStory({ commit }, id) {
      return storiesService.updateStory(id);
    },
    createStory({ commit }, obj) {
      return storiesService.createStory(obj);
    },
    getStoryId({ commit }, id) {
      return storiesService.getStoryId(id);
    },
  },
};
