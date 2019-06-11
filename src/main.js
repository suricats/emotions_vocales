import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import axios from '@/plugins/axios.js'

import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(axios)
Vue.use(Vuetify)


new Vue({
  el: '#app',
  components: { App },
  router,
  render: createEle => createEle(App),
  template: '<App/>'
}).$mount('#app')

