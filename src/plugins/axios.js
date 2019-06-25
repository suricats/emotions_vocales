import axios from 'axios'

export default {
  install (Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      timeout: 10000
    })
    Vue.prototype.$axios = axios.create({
      timeout: 10000
    })
  }
}   