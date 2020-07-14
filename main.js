import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store;

Vue.config.productionTip = false;

// var VueTouch = require('vue-touch');
// Vue.use(VueTouch, {name: 'v-touch'});

import promptBox from './components/promptBox.vue';
import md5 from './common/md5.js';
Vue.prototype.md5 = md5;

import prompPhoto from './components/promptPhoto.vue'
import alertBox from './components/alert.vue'
import alertBoxTwo from './components/alert2.vue'
import alertPay from './components/alertPay.vue'
import shelfAlert from './components/shelfAlert.vue'
import addAlert from './components/addAlert.vue'
import cartAlert from './components/cartAlert.vue'


Vue.component('prompPhoto', prompPhoto);
Vue.component('promptBox', promptBox);
Vue.component('alertBox', alertBox);
Vue.component('alertPay', alertPay);
Vue.component('alertBoxTwo', alertBoxTwo);
Vue.component('shelfAlert', shelfAlert);
Vue.component('addAlert', addAlert);
Vue.component('cartAlert', cartAlert);

App.mpType = 'app'

Vue.prototype.imgURL =function () {

    // return  'http://114.118.7.81:8081/';
	return  'http://122.14.50.6:8084/';

};
Vue.prototype.audio = uni.createInnerAudioContext();
const app = new Vue({
	store,
    ...App
})
app.$mount()
