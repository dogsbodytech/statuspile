import Vue from "vue";
import _ from "underscore";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import providers from "./providers";
import Helper from "./helper";
import Manager from "./manager";

Vue.config.productionTip = false;
Vue.prototype.$providers = _.sortBy(providers, "name");
Vue.prototype.$helper = new Helper();
Vue.prototype.$manager = new Manager();

Vue.prototype.$sendAnalyticsPing = function(to) {
  /** You might not want to mislead analytics with local requests */
  if (window.location.href.indexOf("localhost:8080") < 0) {
    window["_paq"].push(["setCustomUrl", to.path]);
    window["_paq"].push(["setDocumentTitle", to.name]);
    window["_paq"].push(["trackPageView"]);
  }
};

router.afterEach(to => {
  Vue.prototype.$sendAnalyticsPing(to);
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
