import Vue from 'vue';
import router from './router';

import App from './renderer/App.vue';

Vue.config.productionTip = false;
Vue.prototype.location = window.location;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
