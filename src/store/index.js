import Vue from "vue";
import Vuex from "vuex";
import { user } from "./user";

import { auth } from "./auth";
import { role } from "./role";

import { code } from "./code";

import { takecare } from "./takecare";

import { course } from "./course";

import { library } from "./library";

import { lesson } from "./lesson";

import { report } from "./report";

import { guide } from "../store/guide";

import { policy } from "../store/policyrules";

import { stories } from "./story";

import { blogs } from "./blogs";

import { courseHome } from "./courseHome";

import { libraryHome } from "./libraryHome";

import { opnions } from "./opnions";

import { emails } from "./email";

import { recruitments } from "./recruitment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    auth,
    role,
    code,
    takecare,
    course,
    library,
    lesson,
    report,
    guide,
    policy,
    stories,
    blogs,
    courseHome,
    libraryHome,
    opnions,
    emails,
    recruitments,
  },
});
