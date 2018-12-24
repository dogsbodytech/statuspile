import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import providers from "./providers";
import Helper from "./helper";
import Manager from "./manager";

Vue.config.productionTip = false;
Vue.prototype.$providers = providers;
Vue.prototype.$helper = new Helper();
Vue.prototype.$manager = new Manager();

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
