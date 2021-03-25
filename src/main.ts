import Vue from "vue";
import App from "./App.vue";
import { BootstrapVue, BIconPlusCircleFill } from "bootstrap-vue";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.component("BIconPlusCircleFill", BIconPlusCircleFill);

new Vue({
  render: h => h(App)
}).$mount("#app");
