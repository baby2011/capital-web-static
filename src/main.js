// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueI18n from "vue-i18n";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/index.less";

import messages from "./i18n/messages";
import Cookies from 'js-cookie'

Vue.use(VueI18n);
Vue.use(ElementUI);

Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: Cookies.get('lang'), // set locale
  messages, // set locale messages
})

/* eslint-disable no-new */
export default new Vue({
  el: "#app",
  router,
  i18n,
  render: h => h(App)
});
