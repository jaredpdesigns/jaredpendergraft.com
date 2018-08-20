import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import Head from 'vue-headful'

Vue.component('Head', Head)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')