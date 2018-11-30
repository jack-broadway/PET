import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueElectron from 'vue-electron'
import HighchartsVue from 'highcharts-vue'

import App from './App'
import router from './router'
import store from './store'
import { db } from './data'

// Setup DEXIE
Vue.prototype.$db = db

// Setup VUE
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueElectron)
Vue.use(HighchartsVue)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
