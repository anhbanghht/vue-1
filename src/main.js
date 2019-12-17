import Vue from 'vue'
import App from './App.vue'
import store from './store'

import router from './router'
import i18n from './config/1i8n-setup'
import "@/common/Filter"

//import js
import VeeValidate from 'vee-validate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap';
import BootstrapVue from 'bootstrap-vue';
import infiniteScroll from 'vue-infinite-scroll';

// import Popover  from 'vue-js-popover'
// // Vue.use(Popover);
import VPopover from 'vue-js-popover'
Vue.use(VPopover, { tooltip: true })

// import scss
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import './assets/style/_import.scss';
import './assets/style/style.scss';

import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/vue-select/dist/vue-select.css';
import '../node_modules/cropperjs/dist/cropper.min.css';
import '../node_modules/vue2-datepicker/index.css';
import "../node_modules/vue-popover/dist/styles.css";
import '../node_modules/vue2-timepicker/dist/VueTimepicker.css'

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(infiniteScroll);

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
