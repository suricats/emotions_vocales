import axios from 'axios'

export default {
  install (Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: 'http://127.0.0.1:5000/analyse',
      timeout: 10000
    })
  }
}   