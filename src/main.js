import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import DatetimePicker from 'vuetify-datetime-picker'
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
Vue.component('h-title', header)
Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1,//月份
		"d+": this.getDate(),//日
		"H+": this.getHours(),//小时
		"m+": this.getMinutes(),//分
		"s+": this.getSeconds(),//秒
		"q+": Math.floor((this.getMonth() + 3) / 3),//季度
		"S+": this.getMilliseconds()//毫毛
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};


Vue.prototype.$qs = qs;

// //生产环境
if (process.env.NODE_ENV === 'production') {
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
