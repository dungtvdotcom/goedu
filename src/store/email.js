import { emailService } from "./services/email.service";

export const emails = {
  namespaced: true,
  state: {},
  actions: {
    getSubscribedEmails({ commit }, obj) {
      return emailService.getSubscribedEmails(obj);
    },
    getSubscribedEmailId({ commit }, id) {
      return emailService.getSubscribedEmailId(id);
    },
    createSubscribedEmails({ commit }, obj) {
      return emailService.createSubscribedEmails(obj);
    },
    updateSubscribedEmails({ commit }, obj) {
      return emailService.updateSubscribedEmails(obj);
    },
    deleteSubscribedEmails({ commit }, id) {
      return emailService.deleteSubscribedEmails(id);
    },
  },
};
