import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'

import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(toast)

FastClick.attach(document.body)
Vue.use(VueLazyLoad,{
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
}) 

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
