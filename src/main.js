import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  //记得添加router和store到这里
  router,
  store,
  render: h => h(App),
}).$mount('#app')
