import Vue from 'vue'
import DatetimePicker from 'vuetify-datetime-picker'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted';
import qs from 'qs'
import header from '../src/views/header.vue'


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(DatetimePicker);
Vue.use(Toasted);
Vue.component('h-title',header)


Vue.prototype.$qs = qs;

// //生产环境
if (process.env.NODE_ENV ==='production') {
  axios.defaults.baseURL = "";
} else {
  axios.defaults.baseURL = "/proxy";  
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
