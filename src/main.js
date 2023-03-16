import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
Vue.use(VueResource);

import { myHTTP } from "./interceptors";
Vue.$httpEx = myHTTP;
import {URL } from "./config"
Vue.$URL= URL;

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(require("vue-moment"));

new Vue({
  router,
  store,
  vuetify,
  Vuelidate,
  render: (h) => h(App),
}).$mount("#app");
