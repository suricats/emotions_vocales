import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Axios from '@/plugins/axios.js'

Vue.config.productionTip = false
Vue.use(Axios)

new Vue({
  el: '#app',
  components: { App },
  render: createEle => createEle(App),
  template: '<App/>'
}).$mount('#app')

