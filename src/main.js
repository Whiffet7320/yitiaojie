import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const wx = require('weixin-js-sdk')
Vue.prototype.wx = wx
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
